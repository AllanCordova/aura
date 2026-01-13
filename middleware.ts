import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session_token")?.value;

  const publicRoutes = ["/login", "/signup", "/"];
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  if (!token) {
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    await jwtVerify(token, secret);

    if (isPublicRoute && request.nextUrl.pathname !== "/") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log("Token inválido:", error);

    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("session_token");
    return response;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
