import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/lib/constants";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-navy-900 text-white flex flex-col">
      {/* Admin header */}
      <header className="border-b border-navy-700 bg-navy-900">
        <div className="mx-auto max-w-content px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={IMAGES.logo}
              alt="ACBC Logo"
              width={32}
              height={32}
              className="rounded-full shrink-0"
            />
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-white text-sm">ACBC</span>
              <span className="text-navy-600 select-none">/</span>
              <span className="font-sans text-xs uppercase tracking-widest text-gray-400">
                Administration
              </span>
            </div>
          </div>

          <Link
            href="/api/admin/logout"
            className="font-sans text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
          >
            Sign out
          </Link>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
