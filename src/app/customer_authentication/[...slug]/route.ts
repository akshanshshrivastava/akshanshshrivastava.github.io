import { NextResponse } from "next/server";

const HOME_URL = "https://kravvy.com/";

export async function GET() {
  return NextResponse.redirect(HOME_URL, 302);
}
