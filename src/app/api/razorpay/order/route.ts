import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: 'Razorpay keys are not configured on the server.' },
      { status: 401 }
    );
  }

  let body: { amount?: number; currency?: string; receipt?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { amount, currency, receipt } = body;

  if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json(
      { error: 'amount must be a positive number (in major units, e.g. INR rupees).' },
      { status: 400 }
    );
  }

  const amountPaise = Math.round(amount * 100);
  if (amountPaise < 100) {
    return NextResponse.json(
      { error: 'Razorpay minimum order amount is 100 paise (₹1).' },
      { status: 400 }
    );
  }

  try {
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: currency || 'INR',
      receipt: receipt || `kravvy_${Date.now()}`,
    });

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    });
  } catch (error) {
    console.error('Razorpay order error:', error);
    return NextResponse.json(
      { error: 'Failed to create Razorpay order.' },
      { status: 500 }
    );
  }
}
