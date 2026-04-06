"use client";

export default function ScrollRow({
  images,
  direction,
}: {
  images: string[];
  direction: "left" | "right";
}) {
  const doubled = [...images, ...images];

  return (
    <div className="overflow-hidden flex-1 min-h-0">
      <div
        className={`flex h-full gap-0 ${
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
        }`}
      >
        {doubled.map((src, i) => (
          <div key={i} className="shrink-0 w-80 h-full bg-navy-900 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover opacity-60"
              onError={(e) => {
                e.currentTarget.style.opacity = "0";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
