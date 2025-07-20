import { NextResponse } from "next/server";
import verifyToken from "./lib/auth/verifyToken";

const PUBLIC_ROUTES = ["/auth/login", "/auth/register"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  const payload = token && (await verifyToken(token));

  // If user is not logged in
  if (!payload && !PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // If user is logged in
  if (payload && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/auth/login", "/auth/register"],
};
