"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/data/faq";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="divide-y divide-gray-100">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={index}>
            <button
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between py-5 text-left group"
            >
              <span className="font-sans font-semibold text-navy-700 text-base leading-snug pr-8 group-hover:text-navy-500 transition-colors">
                {item.question}
              </span>
              <span
                className="shrink-0 text-gold-500 text-xl font-light leading-none transition-transform duration-200"
                aria-hidden="true"
                style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                +
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: isOpen ? "400px" : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <p className="font-sans text-gray-700 text-sm leading-relaxed pb-5">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
