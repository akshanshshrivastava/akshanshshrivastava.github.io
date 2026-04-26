import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createShopifyOrder } from '@/lib/shopify-admin';

export async function POST(req: Request) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, product } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Create Shopify Order
      const shopifyOrder = await createShopifyOrder({
        line_items: [
          {
            variant_id: product.variantId.split('/').pop(), // Get numeric ID if GID
            quantity: product.quantity,
          }
        ],
        financial_status: "paid",
        transactions: [
          {
            kind: "sale",
            status: "success",
            amount: product.price,
            gateway: "razorpay"
          }
        ],
        note: `Razorpay Payment ID: ${razorpay_payment_id}`
      });

      return NextResponse.json({ success: true, order: shopifyOrder });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 400 });
    }
  } catch (error) {
    console.error('Verification Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Error' }, { status: 500 });
  }
}
