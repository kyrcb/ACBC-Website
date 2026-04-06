"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { IMAGES } from "@/lib/constants";

const { row1, row2, row3 } = IMAGES.heroBackground;

const PREVIEW_IMAGES = [
  { src: row1[0], caption: "ACBC · 2025" },
  { src: row2[0], caption: "ACBC · 2025" },
  { src: row3[0], caption: "ACBC · 2025" },
  { src: row1[1], caption: "ACBC · 2025" },
  { src: row2[1], caption: "ACBC · 2025" },
  { src: row3[1], caption: "ACBC · 2025" },
];

// Slight alternating rotations for the polaroid effect
const ROTATIONS = ["-3deg", "1deg", "-2deg", "2deg", "-1deg", "3deg"];

export default function GalleryPreview() {
  return (
    <section className="bg-navy-900 py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-content px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-500 mb-4">
            Camp Memories
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            Life at Camp
          </h2>
          <div className="w-12 border-t-2 border-gold-500 mx-auto mb-6" />
          <p className="font-sans text-gray-300 text-base max-w-prose mx-auto leading-relaxed">
            Every summer, young people come together to grow in faith, build lasting
            friendships, and encounter God in a powerful way.
          </p>
        </div>

        {/* Polaroid Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {PREVIEW_IMAGES.map((item, i) => (
            <Link
              key={i}
              href="/gallery"
              className="group block"
              style={{ transform: `rotate(${ROTATIONS[i]})` }}
            >
              <div
                className="bg-white p-2 pb-10 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                style={{ transform: "rotate(0deg)" }}
              >
                {/* Photo */}
                <div className="overflow-hidden aspect-square bg-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={`Camp photo ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.opacity = "0";
                    }}
                  />
                </div>
                {/* Polaroid caption */}
                <p className="font-sans text-xs text-center text-navy-700 mt-3 tracking-widest uppercase opacity-70">
                  {item.caption}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button href="/gallery" variant="primary">
            See All Photos
          </Button>
        </div>

      </div>
    </section>
  );
}
