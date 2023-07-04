import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(request, _next) {
  const { pathname } = request.nextUrl;
  const protectedPaths = ["/checkout","/order","/profile","/admin"];
  const matchesProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  
  if (matchesProtectedPath) {
    const token = await getToken({ req: request,secret:process.env.JWT_SECRET });
    // console.log("middlware token",token)
    if (!token) {
      const url = new URL(`/signin`, request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    if (pathname.startsWith("/admin") && token.role !== "admin") {
      const url = new URL(`/403`, request.url);
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}