import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Divider from "@/components/ui/Divider";
import Button from "@/components/ui/Button";
import { IMAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Join ACBC 2026",
  description:
    "Register for the Anchored in Christ Baptist Camp 2026 — Unchained. May 25–29, 2026 at BRSHS Campus, Ligao City, Albay.",
};

const highlights = [
  "Christ-centered preaching and teaching",
  "Biblically sound music",
  "Old-fashioned Worship services",
  "Bible Studies",
  "Exciting recreational activities",
  "Conducive camp site and good food",
];

const PRE_REG_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdXj_oxbjk_ba2RgBNoOO5pNH60V0oGMQgvENtQlT3mpqHIHg/viewform?fbclid=IwY2xjawRAt1lleHRuA2FlbQIxMABicmlkETFIaWk0R1Q0VVN0U0dtZ3BWc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHumFt3LLk3UtXFB8K4mClESovmw9GrEROGWL32Sd0SDgr3y7UIHyuAI2thEQ_aem_uWGxJ2H7uj5q3QAl2trcsg";

export default function JoinPage() {
  return (
    <>
      <PageHeader
        title="Join ACBC 2026"
        subtitle="Unchained — May 25–29, 2026 · BRSHS Campus, Ligao City, Albay"
      />

      <SectionWrapper narrow>
        {/* Greeting */}
        <p className="font-sans text-gray-500 text-sm uppercase tracking-widest mb-6">
          Dear Pastors and Churches
        </p>

        <p className="font-sans text-gray-700 text-lg leading-relaxed">
          We joyfully invite you and your congregation to join us for the{" "}
          <strong className="text-navy-700">
            Anchored in Christ Baptist Camp (ACBC)
          </strong>{" "}
          — a time of worship, fellowship, and spiritual revival for the youth.
          This camp is open to all Baptist churches of the same faith and mind.
        </p>

        <Divider />

        {/* Theme block */}
        <div className="relative overflow-hidden text-white px-8 py-12 my-8">
          {/* Background image */}
          <Image
            src={IMAGES.join2026.themeBg}
            alt="Camp theme background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Content */}
          <div className="relative z-10">
            <p className="font-sans text-xs uppercase tracking-widest text-gold-400 mb-2">
              Theme
            </p>
            <Image
              src={IMAGES.join2026.themeTypography}
              alt="Unchained"
              width={480}
              height={100}
              className="w-full max-w-xs mb-6"
            />
            <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-2">
              Galatians 5:1 (KJV)
            </p>
            <blockquote className="font-serif text-xl leading-relaxed text-gray-100 italic border-l-4 border-gold-500 pl-6">
              Stand fast therefore in the liberty wherewith Christ hath made us
              free, and be not entangled again with the yoke of bondage.
            </blockquote>
          </div>
        </div>

        {/* Purpose */}
        <div className="my-8">
          <p className="font-sans text-xs uppercase tracking-widest text-gold-500 mb-3">
            Purpose
          </p>
          <p className="font-sans text-gray-700 text-base leading-relaxed">
            To evangelize, strengthen faith, deepen discipleship, and challenge
            the next generation to live boldly for Christ.
          </p>
        </div>

        <Divider />

        {/* Highlights */}
        <div className="my-8">
          <p className="font-sans text-xs uppercase tracking-widest text-gold-500 mb-6">
            Highlights
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 block w-2 h-2 rounded-full bg-gold-500 shrink-0" />
                <span className="font-sans text-gray-700 text-sm leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Divider />

        {/* Key Details */}
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-gold-500 mb-2">
              Date
            </p>
            <p className="font-serif text-navy-700 text-lg font-bold">
              May 25–29, 2026
            </p>
          </div>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-gold-500 mb-2">
              Venue
            </p>
            <p className="font-serif text-navy-700 text-lg font-bold leading-snug">
              BRSHS Campus
            </p>
            <p className="font-sans text-gray-500 text-sm">
              Ligao City, Albay, 4504
            </p>
          </div>
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-gold-500 mb-2">
              Camp Fee
            </p>
            <p className="font-serif text-navy-700 text-lg font-bold">
              ₱700 only
            </p>
            <p className="font-sans text-gray-500 text-sm">
              Camp shirts included
            </p>
          </div>
        </div>

        <Divider />

        {/* CTA */}
        <div className="my-10 flex flex-col items-center text-center gap-4">
          <p className="font-sans text-gray-700 text-base max-w-prose">
            This camp is more than just an event — it&apos;s a movement to
            evangelize, equip, and encourage churches in raising up disciples
            who are firmly anchored in the Word of God.
          </p>
          <Button href={PRE_REG_URL} external variant="primary" className="mt-2 text-base px-8 py-4">
            Pre-Register Now
          </Button>
          <p className="font-sans text-gray-400 text-xs uppercase tracking-widest">
            Opens in Google Forms
          </p>
        </div>

        <Divider />

        {/* Contacts */}
        <div className="my-8">
          <p className="font-sans text-xs uppercase tracking-widest text-gold-500 mb-4">
            For Inquiries &amp; Registration
          </p>
          <ul className="flex flex-col gap-2">
            <li className="font-sans text-gray-700 text-sm">
              <span className="font-semibold text-navy-700">Evang. RR Divina</span>
              {" "}— Camp Overseer
            </li>
            <li className="font-sans text-gray-700 text-sm">
              <span className="font-semibold text-navy-700">Ptr. Joel L. Jurado</span>
              {" "}— Camp Director
            </li>
            <li className="font-sans text-gray-700 text-sm">
              <span className="font-semibold text-navy-700">Ptr. Giovanni M. Solares</span>
              {" "}— Camp Director
            </li>
          </ul>
        </div>

        {/* Sign-off */}
        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="font-sans text-gray-500 text-sm italic leading-relaxed max-w-prose mx-auto">
            Together, reach out to the lost and edify the saved, empowering the
            next generation to the glory of God.
          </p>
          <p className="font-serif text-navy-700 text-base font-bold mt-4">
            In Christ, ACBC Core
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
