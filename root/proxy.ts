import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // PUBLIC ROUTES (always allowed)
  const publicRoutes = ["/", "/about", "/pricing"];

  const isPublic = publicRoutes.includes(pathname);
  const isAuthPage = pathname.startsWith("/auth");
  const isProtected = pathname.startsWith("/app");

  // ❌ Not logged in → block protected pages
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/auth/sign-up", request.url));
  }

  // ❌ Logged in → block auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/app/dashboard", request.url));
  }

  // ✅ Public pages always open
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/app/:path*",
  ],
};