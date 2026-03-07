import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
  const isDashboardPage =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/onboarding") ||
    pathname.startsWith("/shows") ||
    pathname.startsWith("/seasons") ||
    pathname.startsWith("/templates") ||
    pathname.startsWith("/billing") ||
    pathname.startsWith("/settings");

  if (isAuthPage && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (isDashboardPage && !isLoggedIn) {
    return Response.redirect(new URL("/sign-in", req.nextUrl));
  }

  return undefined;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
