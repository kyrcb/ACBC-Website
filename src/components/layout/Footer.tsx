import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, IMAGES } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image
                src={IMAGES.logo}
                alt="ACBC Logo"
                width={44}
                height={44}
                className="rounded-full shrink-0"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-serif font-bold text-white text-base tracking-tight">
                  ACBC
                </span>
                <span className="font-sans text-xs text-gray-400">
                  Anchored in Christ Baptist Camp
                </span>
              </div>
            </div>
            <div className="w-8 border-t-2 border-gold-500 mb-4" />
            <p className="font-sans text-sm text-gray-400 leading-relaxed">
              A Christ-centered youth ministry committed to reaching, reviving,
              and raising up the next generation for the glory of God.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-3">
              Quick Links
            </h3>
            <div className="w-8 border-t-2 border-gold-500 mb-4" />
            <nav className="flex flex-col gap-2">
              {SITE_CONFIG.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-sm text-gray-400 hover:text-gold-300 transition-colors uppercase tracking-wider"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-3">
              Contact Us
            </h3>
            <div className="w-8 border-t-2 border-gold-500 mb-4" />
            <div className="flex flex-col gap-2 font-sans text-sm text-gray-400">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="hover:text-gold-300 transition-colors"
              >
                {SITE_CONFIG.email}
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                className="hover:text-gold-300 transition-colors"
              >
                {SITE_CONFIG.phone}
              </a>
              <span>{SITE_CONFIG.location}</span>
              <a
                href={SITE_CONFIG.givingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-gold-500 hover:text-gold-300 font-semibold transition-colors"
              >
                Give Online &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-navy-700">
        <div className="mx-auto max-w-content px-6 py-4">
          <p className="font-sans text-xs text-gray-400 text-center">
            &copy; {currentYear} Anchored In Christ Baptist Camp. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
