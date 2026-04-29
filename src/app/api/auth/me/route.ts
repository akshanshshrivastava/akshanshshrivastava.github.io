import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getCustomer } from '@/lib/shopify-customer';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('kravvy_token')?.value;

  if (!token) {
    return NextResponse.json({ customer: null });
  }

  try {
    const customer = await getCustomer(token);
    return NextResponse.json({ customer });
  } catch {
    const response = NextResponse.json({ customer: null });
    response.cookies.set('kravvy_token', '', { path: '/', maxAge: 0 });
    return response;
  }
}
