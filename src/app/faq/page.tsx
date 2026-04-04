import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import FaqAccordion from "@/components/faq/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Anchored In Christ Baptist Camp.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Have questions? Find answers below."
      />
      <div className="mx-auto max-w-content px-6 py-16 md:py-24">
        <div className="max-w-prose">
          <p className="font-sans text-gray-700 leading-relaxed mb-12">
            Here are answers to the most common questions about ACBC — who we
            are, how the camp works, and how you can be involved. If you have a
            question not listed here, feel free to{" "}
            <a
              href="/contact"
              className="text-gold-700 hover:text-gold-500 underline underline-offset-2 transition-colors"
            >
              contact us directly
            </a>
            .
          </p>
          <FaqAccordion />
        </div>
      </div>
    </>
  );
}
