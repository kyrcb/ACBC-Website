import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos and memories from Anchored in Christ Baptist Camp — moments of faith, fellowship, and life change.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="Moments of faith, fellowship, and life change — captured at camp."
      />
      <GalleryGrid />
    </>
  );
}
