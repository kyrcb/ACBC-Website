import Image from "next/image";
import Button from "@/components/ui/Button";
import { IMAGES } from "@/lib/constants";

const PRE_REG_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdXj_oxbjk_ba2RgBNoOO5pNH60V0oGMQgvENtQlT3mpqHIHg/viewform?fbclid=IwY2xjawRAt1lleHRuA2FlbQIxMABicmlkETFIaWk0R1Q0VVN0U0dtZ3BWc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHumFt3LLk3UtXFB8K4mClESovmw9GrEROGWL32Sd0SDgr3y7UIHyuAI2thEQ_aem_uWGxJ2H7uj5q3QAl2trcsg";

export default function CampBanner2026() {
  return (
    <section className="relative overflow-hidden bg-navy-700 text-white">
      {/* Background image */}
      <Image
        src={IMAGES.join2026.themeBg}
        alt="ACBC 2026 camp background"
        fill
        className="object-cover object-center"
      />
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-content px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left — Theme */}
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-400 mb-4">
              Save the Date &nbsp;·&nbsp; May 25–29, 2026
            </p>
            <Image
              src={IMAGES.join2026.themeTypography}
              alt="Unchained"
              width={480}
              height={100}
              className="w-full max-w-sm mb-2"
            />
            <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-4">
              ACBC 2026 Theme &nbsp;·&nbsp; Galatians 5:1
            </p>
            <div className="w-12 border-t-2 border-gold-500 mb-6" />
            <blockquote className="font-serif text-lg text-gray-200 italic leading-relaxed border-l-4 border-gold-500 pl-5 max-w-sm">
              Stand fast therefore in the liberty wherewith Christ hath made us
              free, and be not entangled again with the yoke of bondage.
            </blockquote>
          </div>

          {/* Right — Details + CTA */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 px-5 py-4">
                <p className="font-sans text-xs uppercase tracking-widest text-gold-400 mb-1">
                  Venue
                </p>
                <p className="font-serif text-white text-base font-semibold leading-snug">
                  BRSHS Campus
                </p>
                <p className="font-sans text-gray-400 text-xs mt-0.5">
                  Ligao City, Albay, 4504
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 px-5 py-4">
                <p className="font-sans text-xs uppercase tracking-widest text-gold-400 mb-1">
                  Camp Fee
                </p>
                <p className="font-serif text-white text-base font-semibold">
                  ₱700 only
                </p>
                <p className="font-sans text-gray-400 text-xs mt-0.5">
                  Camp shirts included
                </p>
              </div>
            </div>

            <p className="font-sans text-gray-300 text-sm leading-relaxed">
              Open to all Baptist churches of the same faith and mind. A time of
              Christ-centered preaching, biblical worship, and spiritual revival
              for the youth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button href={PRE_REG_URL} external variant="primary">
                Pre-Register Now
              </Button>
              <Button
                href="/join-2026"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-navy-700"
              >
                Learn More
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
