import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

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
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          Часто задаваемые вопросы
        </h2>
        <p className="mt-3 text-center text-gray-600">
          Ответы на главные вопросы о нашей работе
        </p>
        <Accordion
          type="single"
          collapsible
          className="mt-10 rounded-2xl border border-gray-200 bg-white px-4 shadow-sm sm:px-6"
        >
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-relaxed text-gray-600">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
