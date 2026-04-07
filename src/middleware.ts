import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/admin", "/admin/((?!login$).+)"],
};

const COOKIE = "acbc_admin_session";

async function computeHmacHex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Constant-time string comparison via XOR over character codes. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function middleware(req: NextRequest) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    // Misconfigured — block access rather than accidentally allow it
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const token = req.cookies.get(COOKIE)?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const expected = await computeHmacHex(secret, "acbc_admin_authenticated");

  if (!safeEqual(token, expected)) {
    const res = NextResponse.redirect(new URL("/admin/login", req.url));
    res.cookies.delete(COOKIE);
    return res;
  }

  return NextResponse.next();
}
