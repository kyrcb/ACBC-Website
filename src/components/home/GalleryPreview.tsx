"use client";

import { useState, useEffect, useCallback, CSSProperties } from "react";
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

const TOTAL = PREVIEW_IMAGES.length;

// Non-linear positions (px from center) so the visual gap stays consistent.
// ±2 cards are pulled in closer to compensate for perspective foreshortening.
const CONFIGS = {
  mobile:  { positions: [0, 190, 310], halfCard: 112, perspective: 1100 },
  desktop: { positions: [0, 380, 600], halfCard: 208, perspective: 2200 },
};

function getCardStyle(
  index: number,
  current: number,
  positions: number[],
  halfCard: number
): CSSProperties {
  let offset = index - current;
  if (offset > TOTAL / 2) offset -= TOTAL;
  if (offset < -TOTAL / 2) offset += TOTAL;

  const abs = Math.abs(offset);
  const isHidden = abs > 2;
  const sign = Math.sign(offset);
  // Clamp visual properties at abs=2 so hidden cards share the ±2 appearance,
  // making fade-in/out seamless rather than jumping from an extreme rotation.
  const dispAbs = Math.min(abs, 2);

  // Hidden cards sit just beyond the ±2 position — the small extra push creates
  // a subtle slide as they fade in/out instead of appearing in place.
  const translateX = sign * (positions[dispAbs] + (isHidden ? 80 : 0));

  return {
    position: "absolute",
    left: "50%",
    top: "0",
    marginLeft: `-${halfCard}px`,
    transform: `translateX(${translateX}px) scale(${1 - dispAbs * 0.16}) rotateY(${-(sign * dispAbs) * 28}deg)`,
    opacity: isHidden ? 0 : abs === 0 ? 1 : abs === 1 ? 0.85 : 0.5,
    filter: `brightness(${dispAbs === 0 ? 1 : dispAbs === 1 ? 0.55 : 0.3})`,
    zIndex: isHidden ? 0 : 10 - abs,
    pointerEvents: isHidden ? "none" : "auto",
    transition: "all 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: !isHidden && abs !== 0 ? "pointer" : "default",
  };
}

export default function GalleryPreview() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cfg, setCfg] = useState<typeof CONFIGS.desktop>(CONFIGS.desktop);

  // Track breakpoint for JS-side positioning math
  useEffect(() => {
    const update = () =>
      setCfg(window.innerWidth < 768 ? CONFIGS.mobile : CONFIGS.desktop);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const prev = useCallback(() => setCurrent((i) => (i - 1 + TOTAL) % TOTAL), []);
  const next = useCallback(() => setCurrent((i) => (i + 1) % TOTAL), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [paused, next]);

  useEffect(() => {
    if (!paused) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [paused, prev, next]);

  return (
    <section className="bg-navy-900 py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-content px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-500 mb-4">
            Camp Memories
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            Life at Camp
          </h2>
          <div className="w-12 border-t-2 border-gold-500 mx-auto mb-6" />
          <p className="font-sans text-gray-300 text-base max-w-prose mx-auto leading-relaxed">
            Every summer, young people come together to grow in faith, build
            lasting friendships, and encounter God in a powerful way.
          </p>
        </div>

        {/* 3D Carousel */}
        <div
          className="relative h-80 md:h-[500px] mb-10 select-none"
          style={{ perspective: `${cfg.perspective}px` }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {PREVIEW_IMAGES.map((item, i) => (
            <div
              key={i}
              style={getCardStyle(i, current, cfg.positions, cfg.halfCard)}
              onClick={() => i !== current && setCurrent(i)}
              aria-label={i !== current ? `View photo ${i + 1}` : undefined}
            >
              {/* Polaroid card — w-56 mobile / w-[26rem] desktop */}
              <div className="bg-white p-2 md:p-3 pb-9 md:pb-14 shadow-2xl w-56 md:w-[26rem]">
                <div className="aspect-square overflow-hidden bg-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={`Camp photo ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.opacity = "0";
                    }}
                  />
                </div>
                <p className="font-sans text-[10px] md:text-xs text-center text-navy-700 mt-3 tracking-widest uppercase opacity-60">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5 mb-10">
          <button
            onClick={prev}
            className="text-white/40 hover:text-gold-500 transition-colors text-4xl leading-none w-10 h-10 flex items-center justify-center"
            aria-label="Previous photo"
          >
            ‹
          </button>

          <div className="flex items-center gap-2">
            {PREVIEW_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-gold-500 w-6"
                    : "bg-white/25 w-1.5 hover:bg-white/50"
                }`}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="text-white/40 hover:text-gold-500 transition-colors text-4xl leading-none w-10 h-10 flex items-center justify-center"
            aria-label="Next photo"
          >
            ›
          </button>
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
