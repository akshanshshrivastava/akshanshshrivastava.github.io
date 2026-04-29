import { NextResponse } from 'next/server';
import { customerCreate, customerLogin } from '@/lib/shopify-customer';

export async function POST(req: Request) {
  let body: { firstName?: string; lastName?: string; email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { firstName, lastName, email, password } = body;
  if (!firstName || !email || !password) {
    return NextResponse.json(
      { error: 'First name, email, and password are required.' },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: 'Password must be at least 8 characters.' },
      { status: 400 }
    );
  }

  try {
    await customerCreate({
      firstName,
      lastName: lastName || '',
      email,
      password,
    });

    const token = await customerLogin(email, password);

    const response = NextResponse.json({ success: true });
    response.cookies.set('kravvy_token', token.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Signup failed.';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
