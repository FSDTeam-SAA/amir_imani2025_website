import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Get token from cookie (set it when user logs in)
  const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  const pathname = request.nextUrl.pathname;
  // Protect /profile route
  if (pathname.startsWith("/profile") && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow access
  return NextResponse.next();
}

// Run proxy only for protected routes
export const config = {
  matcher: ["/profile/:path*", "/profile"],
};
