import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { customerLogout } from '@/lib/shopify-customer';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get('kravvy_token')?.value;

  if (token) {
    try {
      await customerLogout(token);
    } catch {
      // token may already be expired — still clear the cookie
    }
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set('kravvy_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return response;
}
