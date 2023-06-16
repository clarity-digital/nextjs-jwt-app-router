import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(request) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const isAuthRoute = authRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
    const isGuestRoute = guestRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

    if (isGuestRoute && token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!token && isAuthRoute) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("callbackUrl", request.nextUrl.href);
      return NextResponse.redirect(redirectUrl);
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

const authRoutes = ["/dashboard", "/settings"];
const guestRoutes = ["/forgot-password", "/login", "/password-reset", "/register"];
