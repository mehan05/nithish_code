import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Standard Next.js middleware hook
export function middleware(request: NextRequest) {
  // In production, NextAuth middleware is imported here.
  // E.g., export { default } from "next-auth/middleware"
  
  return NextResponse.next();
}

// Matching routes configuration
export const config = {
  matcher: ["/admin/:path*"]
};
