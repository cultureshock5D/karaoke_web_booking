import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const SESSION_COOKIE_NAME = "appwrite_session";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSession = request.cookies.has(SESSION_COOKIE_NAME);

  // Fast-intercept unauthenticated access to /admin and /account
  if (!hasSession && (pathname.startsWith("/admin") || pathname.startsWith("/account"))) {
    const fullPath = pathname + search;
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", fullPath);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
