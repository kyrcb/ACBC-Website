"use client";

import { useState, useEffect, useCallback } from "react";
import { IMAGES } from "@/lib/constants";

const { row1, row2, row3 } = IMAGES.heroBackground;
const ALL_IMAGES = [...row1, ...row2, ...row3];

export default function GalleryGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);

  const prev = useCallback(() => {
    setSelectedIndex((i) => (i === null ? null : (i - 1 + ALL_IMAGES.length) % ALL_IMAGES.length));
  }, []);

  const next = useCallback(() => {
    setSelectedIndex((i) => (i === null ? null : (i + 1) % ALL_IMAGES.length));
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedIndex, close, prev, next]);

  return (
    <>
      {/* Grid */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-content px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {ALL_IMAGES.map((src, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className="group overflow-hidden aspect-square bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gold-500"
                aria-label={`Open photo ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Camp photo ${i + 1}`}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:opacity-90"
                  onError={(e) => {
                    e.currentTarget.parentElement!.style.background = "#e5e7eb";
                    e.currentTarget.style.opacity = "0";
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={close}
        >
          {/* Image container — stop propagation so clicking the image doesn't close */}
          <div
            className="relative max-w-4xl w-full mx-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ALL_IMAGES[selectedIndex]}
              alt={`Camp photo ${selectedIndex + 1}`}
              className="max-h-[85vh] w-auto max-w-full object-contain shadow-2xl"
            />

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sans text-xs text-white/60 tracking-widest">
              {selectedIndex + 1} / {ALL_IMAGES.length}
            </div>
          </div>

          {/* Close */}
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl leading-none font-light w-10 h-10 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            ×
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl w-10 h-10 flex items-center justify-center transition-colors"
            aria-label="Previous photo"
          >
            ‹
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl w-10 h-10 flex items-center justify-center transition-colors"
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
