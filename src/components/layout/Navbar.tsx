"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE_CONFIG, IMAGES } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="mx-auto max-w-content px-6 flex items-center justify-between h-16">
        {/* Logo / Site Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src={IMAGES.logo}
            alt="ACBC Logo"
            width={48}
            height={48}
            className="rounded-full shrink-0"
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="font-serif font-bold text-navy-700 text-xl tracking-tight group-hover:text-navy-500 transition-colors">
              ACBC
            </span>
            <span className="text-xs text-gray-400 font-sans hidden sm:block">
              Anchored in Christ Baptist Camp
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {SITE_CONFIG.navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-sm uppercase tracking-widest transition-colors ${
                  isActive
                    ? "text-navy-700 border-b-2 border-gold-500 pb-0.5"
                    : "text-gray-400 hover:text-navy-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-navy-700 transition-transform duration-200 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-navy-700 transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-navy-700 transition-transform duration-200 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4">
          <nav className="flex flex-col gap-4">
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-sans text-sm uppercase tracking-widest py-1 transition-colors ${
                    isActive
                      ? "text-navy-700 border-l-2 border-gold-500 pl-3"
                      : "text-gray-400 hover:text-navy-700 pl-3"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
