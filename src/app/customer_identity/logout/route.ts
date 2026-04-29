import { NextResponse } from "next/server";

function getSafeReturnUrl(raw: string | null): string {
  if (!raw) return "https://kravvy.com/";

  try {
    const url = new URL(raw);
    const isAllowedHost =
      url.hostname === "kravvy.com" ||
      url.hostname === "www.kravvy.com" ||
      url.hostname === "localhost";

    if (!isAllowedHost) return "https://kravvy.com/";
    if (
      url.pathname.startsWith("/customer_identity") ||
      url.pathname.startsWith("/customer_authentication")
    ) {
      return "https://kravvy.com/";
    }
    return url.toString();
  } catch {
    return "https://kravvy.com/";
  }
}

export async function GET(request: Request) {
  const reqUrl = new URL(request.url);
  const returnUrl = getSafeReturnUrl(reqUrl.searchParams.get("return_url"));
  // Shopify may redirect back here after logout handshake.
  // Finalize by sending users to a safe local destination.
  return NextResponse.redirect(returnUrl, 302);
}
