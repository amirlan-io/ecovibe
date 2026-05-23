import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqItems = [
  {
    id: "communication",
    question: "Как мне общаться с клинером, если он не слышит?",
    answer:
      "Всё очень просто! Все детали уборки, адрес и ваши пожелания вы фиксируете при заказе на сайте или в WhatsApp с нашим менеджером. Клинеры приезжают уже с готовым чек-листом. Если нужно что-то показать на месте — можно использовать жесты или написать текст на телефоне. Это занимает не более 10 секунд и проверено на сотнях заказов.",
  },
  {
    id: "quality",
    question: "Влияет ли это на качество уборки?",
    answer:
      "Да, в лучшую сторону. Наши сотрудники обладают повышенной концентрацией и вниманием к мелочам. Они бережно относятся к вашему дому, работают в абсолютной тишине и не отвлекаются на телефонные звонки или пустые разговоры во время работы.",
  },
  {
    id: "chemistry",
    question: "Какую химию вы используете?",
    answer:
      "Мы используем только сертифицированные эко-средства. Они полностью гипоаллергенны, не имеют резкого химического запаха и абсолютно безопасны для детей и домашних животных.",
  },
  {
    id: "guarantee",
    question: "Что делать, если мне что-то не понравится?",
    answer:
      "Мы гарантируем качество. Если после уборки вы заметите недочеты, просто сообщите нашему менеджеру — мы оперативно приедем и бесплатно всё исправим.",
  },
];

export function FAQ() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-4">Часто задаваемые вопросы</h2>
        <p className="text-center text-gray-600 mb-10">
          Ответы на главные вопросы о нашей работе
        </p>
        <Accordion
          type="single"
          collapsible
          className="rounded-2xl border border-gray-200 bg-white px-6 shadow-sm"
        >
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-base font-medium hover:no-underline py-5">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
