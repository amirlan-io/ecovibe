import { Link } from "react-router";
import {
  Check,
  ChevronRight,
  Sofa,
  Armchair,
  Droplets,
  Wind,
  ShieldCheck,
  Leaf,
} from "lucide-react";
import { motion } from "motion/react";
import { useDocumentMeta } from "../utils/useDocumentMeta";
import { ServiceFAQSection } from "../components/landing/ServiceFAQSection";
import { ServiceLeadForm } from "../components/ServiceLeadForm";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { buildServiceSchema } from "../utils/serviceSchema";

const PATH = "/himchistka-mebeli-astana";
const TITLE = "Химчистка мебели в Астане от 10 000 ₸ | EcoVibe.kz";
const DESCRIPTION =
  "Химчистка мебели в Астане: диваны, кресла, матрасы, ковры. Удаляем пятна и запахи, эко-средства, быстрое высыхание. От 10 000 ₸, выезд мастера в день заявки.";

const pricing = [
  { item: "Диван 2-местный", price: "от 10 000 ₸" },
  { item: "Диван угловой", price: "от 15 000 ₸" },
  { item: "Кресло", price: "от 5 000 ₸" },
  { item: "Матрас", price: "от 8 000 ₸" },
  { item: "Стул / пуф", price: "от 2 000 ₸" },
  { item: "Ковёр (за м²)", price: "от 1 500 ₸" },
];

const included = [
  "Осмотр и определение типа ткани перед чисткой",
  "Сухая чистка от пыли и шерсти животных",
  "Удаление пятен от еды, напитков и грязи",
  "Глубокая чистка методом экстракции",
  "Устранение неприятных запахов",
  "Обработка антибактериальным средством",
  "Просушка профессиональным оборудованием",
  "Финальный осмотр качества результата",
];

const stages = [
  {
    icon: Sofa,
    title: "Оценка ткани",
    text: "Определяем тип обивки и подбираем безопасный метод чистки под материал.",
  },
  {
    icon: Wind,
    title: "Сухая обработка",
    text: "Убираем пыль, шерсть и крупные загрязнения перед влажной чисткой.",
  },
  {
    icon: Droplets,
    title: "Экстракционная чистка",
    text: "Наносим эко-средство и вымываем его вместе с загрязнениями специальным оборудованием.",
  },
  {
    icon: Armchair,
    title: "Просушка",
    text: "Профессиональная сушка сокращает время высыхания мебели до 3–5 часов.",
  },
];

const faqs = [
  {
    q: "Сколько стоит химчистка дивана в Астане?",
    a: "Двухместный диван — от 10 000 ₸, угловой — от 15 000 ₸. Итоговая цена зависит от материала обивки, степени загрязнения и наличия сложных пятен.",
  },
  {
    q: "Сколько времени сохнет мебель после химчистки?",
    a: "При использовании профессионального экстракционного оборудования обивка высыхает за 3–5 часов. Полное высыхание внутренних слоёв может занять до суток в зависимости от плотности ткани.",
  },
  {
    q: "Не испортится ли обивка от чистки?",
    a: "Перед чисткой мы всегда тестируем средство на незаметном участке и подбираем метод под тип ткани — велюр, шенилл, кожзам, микрофибра требуют разного подхода.",
  },
  {
    q: "Можно ли убрать застарелые пятна и запах?",
    a: "В большинстве случаев да. Свежие пятна удаляются полностью, застарелые — становятся значительно менее заметными. Неприятные запахи (шерсть животных, сырость) устраняем отдельной обработкой.",
  },
  {
    q: "Нужно ли готовить мебель к приезду мастера?",
    a: "Желательно освободить диван или кресло от подушек, пледов и мелких предметов — остальное сделает клинер.",
  },
  {
    q: "Безопасна ли химчистка для детей и животных?",
    a: "Да, мы используем гипоаллергенные эко-средства без резкого запаха — находиться в квартире во время и после чистки безопасно для детей и питомцев.",
  },
];

export function HimchistkaMebeliAstana() {
  useDocumentMeta({ title: TITLE, description: DESCRIPTION, path: PATH });

  const schema = buildServiceSchema({
    name: "Химчистка мебели в Астане",
    description: DESCRIPTION,
    path: PATH,
    priceFrom: 10000,
  });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Химчистка мебели" }]} />
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="mb-4">Химчистка мебели в Астане</h1>
            <p className="text-lg text-gray-600 mb-2">Цена от 10 000 ₸</p>
            <p className="text-gray-600 mb-8">
              Диваны, кресла, матрасы, ковры — без запаха и разводов
            </p>
            <Link
              to="#zayavka"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Рассчитать стоимость
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <p className="text-gray-700 leading-relaxed">
          Мягкая мебель со временем накапливает пыль, шерсть животных, пятна от еды и напитков
          — обычная уборка пылесосом с этим не справляется. EcoVibe выполняет профессиональную
          химчистку мебели в Астане: диванов, кресел, матрасов и ковров любого размера.
          Используем метод глубокой экстракционной чистки — средство проникает в волокна
          ткани и вымывается вместе с загрязнениями специальным оборудованием, а не просто
          размазывается по поверхности. Перед началом работы обязательно определяем тип
          обивки и тестируем средство на незаметном участке, чтобы не повредить материал.
          Работаем с гипоаллергенными эко-средствами без резкого запаха — находиться дома
          во время чистки безопасно для детей и питомцев, а благодаря профессиональной
          просушке мебелью можно пользоваться уже через несколько часов.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Разные типы тканей требуют разного подхода: велюр и микрофибра хорошо переносят
          влажную экстракцию, кожа и кожзам чистятся щадящими средствами без спирта, а
          деликатные ткани типа шёлка или жаккарда — методом сухой чистки с минимальным
          количеством влаги. Мы определяем состав обивки визуально и по бирке производителя,
          а при сомнениях тестируем средство на скрытом участке — например, с обратной
          стороны подушки — прежде чем обрабатывать всю поверхность.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Химчистка мебели рекомендуется не только при появлении заметных пятен, но и в
          качестве профилактики — раз в 6–12 месяцев для мебели в обычной эксплуатации и чаще,
          если в доме есть маленькие дети или животные. Регулярная чистка продлевает срок
          службы обивки и предотвращает появление пылевых клещей, которые особенно активно
          размножаются в мягкой мебели.
        </p>
      </section>

      {/* What's included */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">Что входит в химчистку мебели</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {included.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white p-4 rounded-lg">
                <Check className="w-5 h-5 text-purple-700 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stages */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-12">Этапы химчистки</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {stages.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="bg-purple-50 p-6 rounded-xl text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-7 h-7 text-purple-700" />
              </div>
              <p className="text-xs font-semibold text-purple-700 mb-1">Этап {i + 1}</p>
              <h3 className="mb-2 text-sm font-semibold">{title}</h3>
              <p className="text-sm text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-fuchsia-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">Цены на химчистку мебели</h2>
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            {pricing.map((row, i) => (
              <div
                key={row.item}
                className={`flex justify-between items-center px-6 py-4 ${
                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <span className="text-gray-700">{row.item}</span>
                <span className="font-semibold text-purple-700">{row.price}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Финальная цена зависит от материала, размера и степени загрязнения — уточним при
            выезде мастера.
          </p>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-12">Почему выбирают EcoVibe</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6">
            <Leaf className="w-10 h-10 text-purple-700 mx-auto mb-3" />
            <h3 className="mb-2 text-sm font-semibold">Безопасная химия</h3>
            <p className="text-sm text-gray-600">Без резкого запаха — комфортно для детей и питомцев</p>
          </div>
          <div className="text-center p-6">
            <Wind className="w-10 h-10 text-purple-700 mx-auto mb-3" />
            <h3 className="mb-2 text-sm font-semibold">Быстрая просушка</h3>
            <p className="text-sm text-gray-600">Профессиональное оборудование — сухо через 3–5 часов</p>
          </div>
          <div className="text-center p-6">
            <ShieldCheck className="w-10 h-10 text-purple-700 mx-auto mb-3" />
            <h3 className="mb-2 text-sm font-semibold">Гарантия результата</h3>
            <p className="text-sm text-gray-600">Тестируем средство перед чисткой, чтобы не повредить ткань</p>
          </div>
        </div>
      </section>

      {/* Preparation tips */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <h2 className="text-center mb-6">Как подготовиться к химчистке</h2>
        <p className="text-gray-700 leading-relaxed">
          Освободите мебель от подушек, пледов и мелких предметов — это ускорит работу
          мастера. Если на диване есть съёмные чехлы, уточните у нас заранее: некоторые виды
          чехлов можно стирать отдельно, а не подвергать экстракционной чистке. На время
          высыхания (обычно 3–5 часов) старайтесь не садиться на обработанную мебель и
          обеспечить проветривание помещения.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Химчистку мебели удобно заказывать вместе с уборкой квартиры — так клинер приедет
          один раз и выполнит обе задачи, а вы сэкономите на повторном выезде мастера.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Если мебель сильно загрязнена или требует чистки нескольких предметов сразу
          (например, диван и два кресла), сообщите об этом при заявке — подберём удобное
          время с запасом и, при необходимости, направим второго мастера, чтобы уложиться в
          один визит.
        </p>
        <p className="text-gray-700 leading-relaxed">
          После завершения чистки мастер покажет обработанные участки и расскажет, сколько
          времени нужно для полного высыхания именно вашей мебели — оно зависит от плотности
          ткани и наполнителя.
        </p>
      </section>

      <ServiceFAQSection faqs={faqs} className="py-16 bg-gray-50" />

      {/* CTA + form */}
      <section id="zayavka" className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="mb-4">Закажите химчистку мебели</h2>
            <p className="text-gray-600 mb-6">
              Оставьте заявку — уточним тип мебели и рассчитаем точную стоимость. Смотрите
              также{" "}
              <Link to="/uborka-kvartir-astana" className="text-purple-700 underline underline-offset-2 hover:text-purple-800">
                уборку квартир
              </Link>{" "}
              и{" "}
              <Link to="/generalnaya-uborka" className="text-purple-700 underline underline-offset-2 hover:text-purple-800">
                генеральную уборку
              </Link>
              .
            </p>
          </div>
          <ServiceLeadForm serviceType="Химчистка мебели" accent="purple" />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
