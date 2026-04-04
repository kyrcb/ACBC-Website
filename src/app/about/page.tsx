import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import MissionSection from "@/components/about/MissionSection";
import BeliefsSection from "@/components/about/BeliefsSection";
import WhatWeDoSection from "@/components/about/WhatWeDoSection";
import ImpactSection from "@/components/about/ImpactSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn who we are, our mission, and what we believe at Anchored In Christ Baptist Camp.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="A ministry rooted in the unchanging truths of God's Word."
      />
      <MissionSection />
      <BeliefsSection />
      <WhatWeDoSection />
      <ImpactSection />
    </>
  );
}
