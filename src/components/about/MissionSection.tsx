import Divider from "@/components/ui/Divider";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function MissionSection() {
  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Who We Are */}
        <div>
          <h2 className="font-serif text-3xl font-bold text-navy-700 mb-4">
            Who We Are
          </h2>
          <Divider className="mb-6" />
          <p className="font-sans text-gray-700 leading-relaxed">
            Anchored In Christ Baptist Camp is a ministry rooted in the
            unchanging truths of the King James Bible and Baptist distinctives.
            Our passion is to guide young people to walk in the &ldquo;old
            paths&rdquo; with conviction, courage, and commitment.
          </p>
          <p className="font-sans text-gray-700 leading-relaxed mt-4">
            Year after year, we gather young people from across the Philippines
            to encounter the living God through His Word — and to return home
            changed, anchored, and equipped to make a difference for Christ in
            their generation.
          </p>
        </div>

        {/* Our Mission */}
        <div>
          <h2 className="font-serif text-3xl font-bold text-navy-700 mb-4">
            Our Mission
          </h2>
          <Divider className="mb-6" />
          <p className="font-sans text-gray-700 leading-relaxed">
            To reach the lost, revive believers, and raise up young people who
            are fully anchored in Christ and equipped to serve Him.
          </p>
          <blockquote className="mt-8 border-l-4 border-gold-500 pl-6">
            <p className="font-serif text-xl italic text-navy-700 leading-relaxed">
              &ldquo;Thus saith the Lord, Stand ye in the ways, and see, and
              ask for the old paths, where is the good way, and walk therein,
              and ye shall find rest for your souls.&rdquo;
            </p>
            <footer className="mt-3 font-sans text-sm text-gray-400">
              Jeremiah 6:16
            </footer>
          </blockquote>
        </div>
      </div>
    </SectionWrapper>
  );
}
