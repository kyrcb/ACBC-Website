interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="bg-navy-700 text-white">
      <div className="mx-auto max-w-content px-6 py-16 md:py-20">
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
