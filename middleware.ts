import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const isAuthRoute = (pathname: string) =>
  pathname.startsWith("/login") || pathname.startsWith("/signup");

const SESSION_COOKIE = "sv_session";

const getSession = async (token?: string) => {
  if (!token || !process.env.AUTH_SECRET) return null;
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.AUTH_SECRET)
    );
    return payload;
  } catch {
    return null;
  }
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await getSession(token);

  const pathname = request.nextUrl.pathname;
  const isProtected =
    pathname.startsWith("/packs") ||
    pathname.startsWith("/decks") ||
    pathname.startsWith("/matchups") ||
    pathname.startsWith("/users") ||
    pathname.startsWith("/stats");

  if (isProtected && !session) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (session && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL("/packs", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/packs/:path*",
    "/decks/:path*",
    "/matchups/:path*",
    "/users/:path*",
    "/stats/:path*",
    "/login",
    "/signup",
  ],
};
