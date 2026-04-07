export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createSessionToken, ACBC_ADMIN_COOKIE } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { password } = body as { password?: string };

  if (!password || typeof password !== "string") {
    return NextResponse.json({ error: "Password is required." }, { status: 400 });
  }

  if (!process.env.ADMIN_PASSWORD || !process.env.SESSION_SECRET) {
    console.error("[admin/login] ADMIN_PASSWORD or SESSION_SECRET is not set.");
    return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  const valid = verifyPassword(password);

  if (!valid) {
    // Artificial delay to slow brute-force attempts
    await new Promise((r) => setTimeout(r, 300));
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const token = createSessionToken();

  const res = NextResponse.json({ success: true });
  res.cookies.set(ACBC_ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/admin",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return res;
}
