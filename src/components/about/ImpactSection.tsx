export default function ImpactSection() {
  return (
    <section className="bg-navy-700 text-white">
      <div className="mx-auto max-w-content px-6 py-16 md:py-24 text-center">
        <h2 className="font-serif text-3xl font-bold mb-4">Our Impact</h2>
        <div className="w-12 border-t-2 border-gold-500 mx-auto mb-8" />

        <p className="font-sans text-gray-300 text-lg leading-relaxed max-w-prose mx-auto">
          Year after year, ACBC has become a place where lives are changed.
          Souls have been saved, hearts revived, and lives surrendered to
          God&apos;s calling. Many who have attended the camp have gone on to
          serve in their local churches, pursue full-time ministry, and share
          the gospel throughout the Philippines.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { label: "Souls Saved", text: "Young people who came to know the Lord Jesus Christ as their personal Savior." },
            { label: "Hearts Revived", text: "Believers who were stirred, renewed, and rededicated their lives to God." },
            { label: "Lives Surrendered", text: "Those who answered God's call to full-time ministry and service." },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <h3 className="font-serif text-xl font-semibold text-gold-500 mb-3">
                {item.label}
              </h3>
              <p className="font-sans text-gray-400 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
