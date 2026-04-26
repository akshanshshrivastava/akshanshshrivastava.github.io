import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createShopifyOrder } from '@/lib/shopify-admin';

interface VerifyLineItem {
  variantId: string;
  quantity: number;
  price: string | number;
  title?: string;
}

interface VerifyBody {
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
  product?: VerifyLineItem;
  items?: VerifyLineItem[];
}

export async function POST(req: Request) {
  let body: VerifyBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return NextResponse.json(
      { success: false, error: 'Missing required Razorpay fields.' },
      { status: 400 }
    );
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json(
      { success: false, error: 'Server misconfigured: RAZORPAY_KEY_SECRET missing.' },
      { status: 500 }
    );
  }

  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  // Constant-time comparison to avoid timing attacks
  const isAuthentic =
    expectedSignature.length === razorpay_signature.length &&
    crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(razorpay_signature)
    );

  if (!isAuthentic) {
    return NextResponse.json(
      { success: false, error: 'Invalid signature.' },
      { status: 400 }
    );
  }

  // Payment is verified. Try to record the order in Shopify, but treat that
  // as best-effort: payment success must not depend on Shopify Admin working.
  const lineItems = body.items ?? (body.product ? [body.product] : []);
  let shopifyOrder: unknown = null;
  let shopifyError: string | null = null;

  if (lineItems.length > 0) {
    try {
      shopifyOrder = await createShopifyOrder({
        line_items: lineItems.map((item) => ({
          variant_id: stripGid(item.variantId),
          quantity: item.quantity,
        })),
        financial_status: 'paid',
        transactions: [
          {
            kind: 'sale',
            status: 'success',
            amount: lineItems.reduce(
              (sum, item) => sum + Number(item.price) * item.quantity,
              0
            ),
            gateway: 'razorpay',
          },
        ],
        note: `Razorpay Payment ID: ${razorpay_payment_id}`,
      });
    } catch (err) {
      shopifyError = err instanceof Error ? err.message : 'Unknown Shopify error';
      console.error('Shopify order creation failed (payment was still verified):', err);
    }
  }

  return NextResponse.json({
    success: true,
    payment_id: razorpay_payment_id,
    order_id: razorpay_order_id,
    shopify_order: shopifyOrder,
    shopify_error: shopifyError,
  });
}

function stripGid(id: string): string {
  // Shopify GIDs look like "gid://shopify/ProductVariant/123" — Admin API wants "123".
  const parts = id.split('/');
  return parts[parts.length - 1] || id;
}
