import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import GalleryPreview from "@/components/home/GalleryPreview";
import CampBanner2026 from "@/components/home/CampBanner2026";
import CtaGrid from "@/components/home/CtaGrid";

export const metadata: Metadata = {
  title: "Anchored in Christ Baptist Camp",
  description:
    "A Christ-centered youth ministry committed to reaching, reviving, and raising up the next generation for the glory of God.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GalleryPreview />
      <CampBanner2026 />
      <CtaGrid />
    </>
  );
}
