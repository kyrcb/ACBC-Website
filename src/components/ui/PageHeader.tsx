import ScrollRow from "@/components/ui/ScrollRow";
import { IMAGES } from "@/lib/constants";

const { row1, row2 } = IMAGES.heroBackground;

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="relative bg-navy-700 text-white overflow-hidden">
      {/* Scrolling background — 2 rows */}
      <div className="absolute inset-0 flex flex-col gap-0">
        <ScrollRow images={row1} direction="left" />
        <ScrollRow images={row2} direction="right" />
      </div>

      {/* Navy overlay */}
      <div className="absolute inset-0 bg-navy-700/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-content px-6 py-16 md:py-20">
        <h1 className="font-serif text-4xl md:text-5xl font-bold">{title}</h1>
        {subtitle && (
          <p className="mt-4 font-sans text-gray-400 text-lg max-w-prose">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
