import { NextResponse } from 'next/server';
import { customerLogin } from '@/lib/shopify-customer';

export async function POST(req: Request) {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  try {
    const token = await customerLogin(email, password);

    const response = NextResponse.json({ success: true });
    response.cookies.set('kravvy_token', token.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return response;
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Login failed.';
    return NextResponse.json({ error: msg }, { status: 401 });
  }
}
