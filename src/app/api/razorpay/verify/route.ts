import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createShopifyOrder } from '@/lib/shopify-admin';
import {
  sanitizeCustomerInfo,
  validateCustomerInfo,
  hasErrors,
  CustomerInfo,
} from '@/lib/checkout-validation';

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
  customer?: Record<string, unknown>;
}

const MAX_BODY_SIZE = 50_000; // 50 KB hard cap

export async function POST(req: Request) {
  // ── A05: Security Misconfiguration — check origin ──
  const origin = req.headers.get('origin') || '';
  const allowedOrigins = [
    'https://kravvy.com',
    'https://www.kravvy.com',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
  ].filter(Boolean);

  if (origin && !allowedOrigins.some((o) => origin.startsWith(o))) {
    return NextResponse.json(
      { success: false, error: 'Forbidden origin.' },
      { status: 403 }
    );
  }

  // ── A08: Integrity — enforce body size limit ──
  const contentLength = parseInt(req.headers.get('content-length') || '0', 10);
  if (contentLength > MAX_BODY_SIZE) {
    return NextResponse.json(
      { success: false, error: 'Payload too large.' },
      { status: 413 }
    );
  }

  let body: VerifyBody;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY_SIZE) {
      return NextResponse.json(
        { success: false, error: 'Payload too large.' },
        { status: 413 }
      );
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body.' },
      { status: 400 }
    );
  }

  // ── A03: Injection — validate Razorpay IDs are alphanumeric ──
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;
  const ID_RE = /^[a-zA-Z0-9_]+$/;

  if (
    !razorpay_payment_id ||
    !razorpay_order_id ||
    !razorpay_signature ||
    !ID_RE.test(razorpay_payment_id) ||
    !ID_RE.test(razorpay_order_id) ||
    !/^[a-f0-9]+$/.test(razorpay_signature)
  ) {
    return NextResponse.json(
      { success: false, error: 'Missing or malformed Razorpay fields.' },
      { status: 400 }
    );
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json(
      { success: false, error: 'Server misconfigured.' },
      { status: 500 }
    );
  }

  // ── A02: Cryptographic Failures — timing-safe HMAC comparison ──
  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

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

  // ── A04: Insecure Design — server re-validates customer data ──
  let customer: CustomerInfo | null = null;
  if (body.customer && typeof body.customer === 'object') {
    const sanitized = sanitizeCustomerInfo(body.customer);
    const errors = validateCustomerInfo(sanitized);
    if (hasErrors(errors)) {
      return NextResponse.json(
        { success: false, error: 'Invalid customer details.', validation: errors },
        { status: 400 }
      );
    }
    customer = sanitized;
  }

  // ── Build Shopify order ──
  const lineItems = body.items ?? (body.product ? [body.product] : []);
  let shopifyOrder: unknown = null;
  let shopifyError: string | null = null;

  if (lineItems.length > 0) {
    const orderPayload: Record<string, unknown> = {
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
    };

    if (customer) {
      orderPayload.email = customer.email;
      orderPayload.phone = customer.phone;
      orderPayload.customer = {
        first_name: customer.fullName.split(' ')[0],
        last_name: customer.fullName.split(' ').slice(1).join(' ') || '',
        email: customer.email,
        phone: customer.phone,
      };
      const shippingAddress = {
        first_name: customer.fullName.split(' ')[0],
        last_name: customer.fullName.split(' ').slice(1).join(' ') || '',
        address1: customer.address1,
        address2: customer.address2 || undefined,
        city: customer.city,
        province: customer.state,
        zip: customer.pincode,
        country: 'IN',
        phone: customer.phone,
      };
      orderPayload.shipping_address = shippingAddress;
      orderPayload.billing_address = shippingAddress;
    }

    try {
      shopifyOrder = await createShopifyOrder(orderPayload);
    } catch (err) {
      shopifyError =
        err instanceof Error ? err.message : 'Unknown Shopify error';
      console.error(
        'Shopify order creation failed (payment was still verified):',
        err
      );
    }
  }

  // ── A09: Logging — log payment ID but NOT customer PII ──
  console.log(
    `Payment verified: ${razorpay_payment_id}, order: ${razorpay_order_id}, customer_provided: ${!!customer}`
  );

  return NextResponse.json({
    success: true,
    payment_id: razorpay_payment_id,
    order_id: razorpay_order_id,
    shopify_order: shopifyOrder,
    shopify_error: shopifyError,
  });
}

function stripGid(id: string): string {
  const parts = id.split('/');
  return parts[parts.length - 1] || id;
}
