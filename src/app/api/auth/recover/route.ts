import { NextResponse } from 'next/server';
import { customerRecover } from '@/lib/shopify-customer';

export async function POST(req: Request) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { email } = body;
  if (!email) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }

  try {
    await customerRecover(email);
    return NextResponse.json({ success: true });
  } catch (err) {
    // Don't reveal whether the email exists
    return NextResponse.json({ success: true });
  }
}
