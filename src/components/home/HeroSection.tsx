// To add a camp background photo:
// 1. Place your photo at public/images/camp-hero.jpg
// 2. Uncomment the Image and overlay divs below
// 3. Add "use client" at the top if you need onError handling

import Button from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";

// import Image from "next/image";
// import { IMAGES } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative bg-navy-700 text-white min-h-[90vh] flex items-center overflow-hidden">
      {/*
        Camp background photo (uncomment once public/images/camp-hero.jpg is added):
        <Image
          src={IMAGES.campHero}
          alt="Camp background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-navy-700/80" />
      */}

      <div className="relative mx-auto max-w-content px-6 py-24 md:py-32">
        <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
          {SITE_CONFIG.tagline
            .split(". ")
            .filter(Boolean)
            .map((line, i) => (
              <span key={i} className="block">
                {line.endsWith(".") ? line : `${line}.`}
              </span>
            ))}
        </h1>

        <div className="w-12 border-t-2 border-gold-500 my-8" />

        <p className="font-sans text-gray-300 text-lg leading-relaxed max-w-prose">
          Anchored In Christ Baptist Camp (ACBC) is a Christ-centered youth
          ministry committed to reaching, reviving, and raising up the next
          generation for the glory of God. Through powerful Bible preaching,
          old-time worship, and meaningful fellowship, we strive to anchor
          hearts firmly in Christ.
        </p>

        <p className="font-sans text-gray-300 text-lg leading-relaxed max-w-prose mt-4">
          Every year, young people from across the Philippines gather to grow in
          their faith, build lasting friendships, and make life-changing
          decisions for Christ. Many have come to know the Lord, surrendered to
          full-time ministry, and experienced true spiritual revival.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button href="/contact" variant="primary">
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
    </section>
  );
}
