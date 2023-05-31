import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isAuthRoute = authRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
  const isGuestRoute = guestRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  if (!token && isAuthRoute) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("callbackUrl", request.nextUrl.href);
    return NextResponse.redirect(redirectUrl);
  }

  if (token && isGuestRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

const authRoutes = ["/dashboard"];
const guestRoutes = ["/register", "/login"];

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
