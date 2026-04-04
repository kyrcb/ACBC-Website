import Button from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";

const CTA_CARDS = [
  {
    title: "Join the Camp",
    description:
      "Connect with us and find out how your church can participate in the annual youth camp. Open to Baptist pastors and churches of like faith across the Philippines.",
    buttonLabel: "Get in Touch",
    href: "/contact",
    external: false,
  },
  {
    title: "Support the Mission",
    description:
      "Partner with us financially by giving $20/month as part of our missionary endeavor. Every gift helps us continue reaching and reviving young lives for Christ.",
    buttonLabel: "Give Online",
    href: SITE_CONFIG.givingUrl,
    external: true,
  },
  {
    title: "Be Part of What God Is Doing",
    description:
      "Pray for the ministry, spread the word, and encourage your church to send young people. Your involvement — in any form — makes an eternal difference.",
    buttonLabel: "Learn More",
    href: "/about",
    external: false,
  },
];

export default function CtaGrid() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-content px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CTA_CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-white border border-navy-700 p-8 flex flex-col gap-6 hover:border-gold-500 transition-colors duration-200"
            >
              <div>
                <h2 className="font-serif text-xl font-semibold text-navy-700 mb-3">
                  {card.title}
                </h2>
                <p className="font-sans text-gray-700 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
              <div className="mt-auto">
                <Button
                  href={card.href}
                  external={card.external}
                  variant="outline"
                >
                  {card.buttonLabel}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
