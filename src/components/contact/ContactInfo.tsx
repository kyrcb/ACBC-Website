import Divider from "@/components/ui/Divider";
import { SITE_CONFIG } from "@/lib/constants";

export default function ContactInfo() {
  const { mailingAddress } = SITE_CONFIG;

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-navy-700 mb-4">
        Get in Touch
      </h2>
      <Divider className="mb-8" />

      <p className="font-sans text-gray-700 text-sm leading-relaxed mb-8">
        We would love to hear from you! Whether you have questions about the
        camp, want to partner with us, or need more information about
        supporting the ministry — reach out and we&apos;ll be glad to
        respond.
      </p>

      <div className="flex flex-col gap-8">
        {/* Email */}
        <div>
          <h3 className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-1">
            Email
          </h3>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="font-sans text-navy-700 hover:text-gold-700 transition-colors"
          >
            {SITE_CONFIG.email}
          </a>
        </div>

        {/* Phone */}
        <div>
          <h3 className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-1">
            Phone
          </h3>
          <a
            href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
            className="font-sans text-navy-700 hover:text-gold-700 transition-colors"
          >
            {SITE_CONFIG.phone}
          </a>
        </div>

        {/* Location */}
        <div>
          <h3 className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-1">
            Location
          </h3>
          <p className="font-sans text-navy-700">{SITE_CONFIG.location}</p>
        </div>

        {/* Mailing Address */}
        <div>
          <h3 className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-1">
            Mailing Address (Support &amp; Donations)
          </h3>
          <address className="font-sans text-navy-700 not-italic leading-relaxed">
            {mailingAddress.recipient}
            <br />
            {mailingAddress.street}
            <br />
            {mailingAddress.city}
          </address>
          <p className="font-sans text-sm text-gray-400 mt-1">
            Memo: {mailingAddress.memo}
          </p>
        </div>

        {/* Online Giving */}
        <div>
          <h3 className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-1">
            Online Giving
          </h3>
          <p className="font-sans text-gray-700 text-sm leading-relaxed mb-2">
            You may support the ministry through our secure giving portal:
          </p>
          <a
            href={SITE_CONFIG.givingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans text-sm font-semibold text-gold-700 hover:text-gold-500 transition-colors underline underline-offset-2"
          >
            Give Online &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
