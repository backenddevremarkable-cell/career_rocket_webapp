// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Protected Routes
  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/community",
    "/ideal-career-test",
    "/my-test",
    "/personality-test",
    "/reports",
    "/resources",
    "/skill-test",
  ];

  // Check Protected Routes
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If user not logged in
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/sign-up", req.url));
  }

  // Prevent logged in users from visiting signup page
  if (pathname === "/sign-up" && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Middleware Apply Routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/community/:path*",
    "/ideal-career-test/:path*",
    "/my-test/:path*",
    "/personality-test/:path*",
    "/reports/:path*",
    "/resources/:path*",
    "/skill-test/:path*",
    "/sign-up",
  ],
};