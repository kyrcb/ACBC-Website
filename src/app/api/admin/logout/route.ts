import { NextRequest, NextResponse } from "next/server";
import { ACBC_ADMIN_COOKIE } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/admin/login", req.url));
  res.cookies.set(ACBC_ADMIN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/admin",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });
  return res;
}
