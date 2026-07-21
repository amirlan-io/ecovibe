import { ChevronRight } from "lucide-react";

export interface ServiceFAQ {
  q: string;
  a: string;
}

interface ServiceFAQSectionProps {
  faqs: ServiceFAQ[];
  title?: string;
  className?: string;
}

/** FAQ-аккордеон + FAQPage JSON-LD. Рендерится внутри #root, поэтому попадает
 * в статический HTML, который scripts/render-full-html.mjs пишет для ботов. */
export function ServiceFAQSection({
  faqs,
  title = "Часто задаваемые вопросы",
  className = "py-16 sm:py-20",
}: ServiceFAQSectionProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <section className={className}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-12">{title}</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="bg-white border border-gray-200 rounded-lg p-6 group"
            >
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center gap-4">
                {faq.q}
                <ChevronRight className="w-5 h-5 text-gray-400 shrink-0 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}
