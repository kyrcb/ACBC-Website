"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IMAGES } from "@/lib/constants";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Invalid password.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo + title */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src={IMAGES.logo}
            alt="ACBC Logo"
            width={56}
            height={56}
            className="rounded-full mb-4"
          />
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-400 mb-1">
            ACBC
          </p>
          <h1 className="font-serif text-2xl font-bold text-white">
            Site Administration
          </h1>
        </div>

        {/* Card */}
        <div className="bg-navy-700 border border-navy-600 p-8">
          <div className="w-8 border-t-2 border-gold-500 mb-6" />

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="font-sans text-xs uppercase tracking-widest text-gray-400"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="bg-navy-900 border border-navy-600 text-white font-sans text-sm px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
                placeholder="Enter admin password"
              />
            </div>

            {error && (
              <p className="font-sans text-xs text-red-400 border border-red-400/30 bg-red-400/10 px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="font-sans text-sm uppercase tracking-widest px-6 py-3 bg-gold-500 text-navy-900 hover:bg-gold-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <p className="font-sans text-xs text-gray-600 text-center mt-6">
          Anchored in Christ Baptist Camp &mdash; Internal Use Only
        </p>
      </div>
    </div>
  );
}
