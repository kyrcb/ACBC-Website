import Divider from "@/components/ui/Divider";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { MINISTRIES } from "@/data/whatWeDo";

export default function WhatWeDoSection() {
  return (
    <SectionWrapper>
      <h2 className="font-serif text-3xl font-bold text-navy-700 mb-4">
        What We Do
      </h2>
      <Divider className="mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MINISTRIES.map((ministry) => (
          <div
            key={ministry.title}
            className="border border-gray-100 p-8 hover:border-gold-500 transition-colors duration-200"
          >
            <h3 className="font-serif text-xl font-semibold text-navy-700 mb-3">
              {ministry.title}
            </h3>
            <p className="font-sans text-gray-700 text-sm leading-relaxed">
              {ministry.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
