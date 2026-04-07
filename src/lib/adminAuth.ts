import crypto from "crypto";

export const ACBC_ADMIN_COOKIE = "acbc_admin_session";

function getEnv() {
  const secret = process.env.SESSION_SECRET;
  const password = process.env.ADMIN_PASSWORD;
  if (!secret || !password) return null;
  return { secret, password };
}

/** Constant-time password check using HMAC digests (same length, no throw). */
export function verifyPassword(submitted: string): boolean {
  const env = getEnv();
  if (!env) return false;
  const a = crypto
    .createHmac("sha256", env.secret)
    .update(submitted)
    .digest();
  const b = crypto
    .createHmac("sha256", env.secret)
    .update(env.password)
    .digest();
  return crypto.timingSafeEqual(a, b);
}

/** Deterministic session token — same secret always produces same token. */
export function createSessionToken(): string {
  const env = getEnv();
  if (!env) throw new Error("SESSION_SECRET is not set");
  return crypto
    .createHmac("sha256", env.secret)
    .update("acbc_admin_authenticated")
    .digest("hex");
}

/** Constant-time validation of a cookie value against the expected token. */
export function validateSessionToken(token: string): boolean {
  const env = getEnv();
  if (!env) return false;
  try {
    const expected = Buffer.from(createSessionToken(), "hex");
    const provided = Buffer.from(token, "hex");
    if (expected.length !== provided.length) return false;
    return crypto.timingSafeEqual(expected, provided);
  } catch {
    return false;
  }
}
