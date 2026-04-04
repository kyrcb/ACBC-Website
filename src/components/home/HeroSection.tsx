import Button from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="bg-navy-700 text-white min-h-[90vh] flex items-center">
      <div className="mx-auto max-w-content px-6 py-24 md:py-32">
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
