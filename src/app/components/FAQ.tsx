import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    id: "home",
    question: "Нужно ли мне быть дома?",
    answer:
      "Не обязательно, если вы заранее согласуете доступ и оставите инструкции менеджеру. Многие клиенты встречают клинера, показывают зоны работы и уходят — мы пришлём фото-отчёт после уборки.",
  },
  {
    id: "quality",
    question: "Что если мне не понравится качество?",
    answer:
      "Мы гарантируем результат. Если что-то не устроит — сообщите менеджеру в течение 24 часов, и мы бесплатно переделаем проблемные зоны.",
  },
  {
    id: "chemistry",
    question: "Какую химию вы используете?",
    answer:
      "Только сертифицированные эко-средства: гипоаллергенные, без резкого запаха, безопасные для детей и домашних животных.",
  },
  {
    id: "communication",
    question: "Как общаться с клинером, если он не слышит?",
    answer:
      "Все детали фиксируются при заказе. На месте можно использовать жесты или короткие сообщения в WhatsApp — это занимает секунды.",
  },
];

export function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="section-mobile bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="landing-h2 text-center font-bold">
          Часто задаваемые вопросы
        </h2>
        <p className="landing-body mt-3 text-center text-gray-600">
          Ответы на главные вопросы о нашей работе
        </p>
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white px-4 shadow-sm sm:px-6">
          {faqItems.map((item) => (
            <details
              key={item.id}
              className="group border-b border-gray-200 last:border-b-0"
            >
              <summary className="btn-touch flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-medium [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown className="size-4 shrink-0 text-gray-500 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="pb-5 text-base leading-relaxed text-gray-600">{item.answer}</p>
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
