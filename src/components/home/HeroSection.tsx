"use client";

import Button from "@/components/ui/Button";
import ScrollRow from "@/components/ui/ScrollRow";
import { SITE_CONFIG, IMAGES } from "@/lib/constants";

const { row1, row2, row3 } = IMAGES.heroBackground;

export default function HeroSection() {
  const taglineLines = SITE_CONFIG.tagline
    .split(". ")
    .filter(Boolean)
    .map((l) => (l.endsWith(".") ? l : `${l}.`));

  return (
    <section className="relative bg-navy-700 text-white min-h-[90vh] flex items-center overflow-hidden">
      {/* ── Scrolling background ── */}
      <div className="absolute inset-0 flex flex-col gap-0">
        <ScrollRow images={row1} direction="left" />
        <ScrollRow images={row2} direction="right" />
        <ScrollRow images={row3} direction="left" />
      </div>

      {/* ── Navy overlay ── */}
      <div className="absolute inset-0 bg-navy-700/80" />

      {/* ── Hero content — 2-column ── */}
      <div className="relative z-10 w-full mx-auto max-w-content px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left column — Tagline */}
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-500 mb-6">
              Est. 2025 &nbsp;·&nbsp; Ligao City, Albay
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold leading-[1.1]">
              {taglineLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <div className="w-12 border-t-2 border-gold-500 mt-8" />
          </div>

          {/* Right column — Description + CTAs */}
          <div className="flex flex-col gap-6">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-500">
              Anchored In Christ Baptist Camp
            </p>

            <p className="font-sans text-gray-200 text-base leading-relaxed">
              A Christ-centered youth ministry committed to reaching, reviving,
              and raising up the next generation for the glory of God. Through
              powerful Bible preaching, old-time worship, and meaningful
              fellowship, we strive to anchor hearts firmly in Christ.
            </p>

            <p className="font-sans text-gray-300 text-sm leading-relaxed">
              Every year, young people from across the Philippines gather to
              grow in their faith, build lasting friendships, and make
              life-changing decisions for Christ.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button href="/join-2026" variant="primary">
                Join the Camp
              </Button>
              <Button
                href={SITE_CONFIG.givingUrl}
                external
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-navy-700"
              >
                Support the Mission
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
