import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Anchored In Christ Baptist Camp. We would love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="We would love to hear from you."
      />
      <div className="mx-auto max-w-content px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16">
          {/* Contact Info — 2/5 width */}
          <div className="md:col-span-2">
            <ContactInfo />
          </div>

          {/* Divider on mobile */}
          <div className="md:hidden border-t border-gray-100" />

          {/* Contact Form — 3/5 width */}
          <div className="md:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
