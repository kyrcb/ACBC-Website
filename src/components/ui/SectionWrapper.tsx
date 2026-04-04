interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "article" | "div";
  narrow?: boolean;
}

export default function SectionWrapper({
  children,
  className = "",
  as: Tag = "section",
  narrow = false,
}: SectionWrapperProps) {
  return (
    <Tag
      className={`mx-auto ${narrow ? "max-w-prose" : "max-w-content"} px-6 py-16 md:py-24 ${className}`}
    >
      {children}
    </Tag>
  );
}
