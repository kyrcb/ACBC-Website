import Divider from "@/components/ui/Divider";
import { BELIEFS } from "@/data/beliefs";

export default function BeliefsSection() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-content px-6 py-16 md:py-24">
        <h2 className="font-serif text-3xl font-bold text-navy-700 mb-4">
          What We Believe
        </h2>
        <Divider className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {BELIEFS.map((belief) => (
            <div key={belief.number} className="flex gap-6">
              <span className="font-sans text-xs font-semibold text-gold-500 uppercase tracking-widest pt-1 shrink-0">
                {belief.number}
              </span>
              <div>
                <h3 className="font-serif text-lg font-semibold text-navy-700 mb-2">
                  {belief.title}
                </h3>
                <p className="font-sans text-gray-700 text-sm leading-relaxed">
                  {belief.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
