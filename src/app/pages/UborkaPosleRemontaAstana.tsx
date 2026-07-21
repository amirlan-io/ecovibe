import { Link } from "react-router";
import {
  Check,
  ChevronRight,
  Wind,
  SprayCan,
  Sparkles,
  PaintBucket,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import { useDocumentMeta } from "../utils/useDocumentMeta";
import { ServiceFAQSection } from "../components/landing/ServiceFAQSection";
import { ServiceLeadForm } from "../components/ServiceLeadForm";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { buildServiceSchema } from "../utils/serviceSchema";

const PATH = "/uborka-posle-remonta-astana";
const TITLE = "Уборка после ремонта в Астане от 850 ₸/м² | EcoVibe.kz";
const DESCRIPTION =
  "Уборка после ремонта в Астане: удаление строительной пыли, следов краски и клея, мойка окон. От 850 ₸/м², выезд мастера в день заявки. Рассчитайте стоимость онлайн.";

const included = [
  "Удаление строительной пыли со всех поверхностей",
  "Мойка окон, рам и подоконников от разводов и наклеек",
  "Снятие защитной плёнки со стеклопакетов и дверей",
  "Очистка от следов краски, клея, шпаклёвки и цемента",
  "Чистка люстр, розеток и выключателей",
  "Мойка полов, включая труднодоступные углы",
  "Уборка внутри и снаружи кухонных шкафов",
  "Дезинфекция и полировка сантехники",
  "Вынос строительного мусора и упаковки",
  "Финальная полировка зеркал и стеклянных поверхностей",
];

const stages = [
  {
    icon: Truck,
    title: "Вывоз крупного мусора",
    text: "Убираем остатки стройматериалов, упаковку и крупный строительный мусор.",
  },
  {
    icon: Wind,
    title: "Удаление пыли",
    text: "Проходим все поверхности сверху вниз — от потолка и светильников до плинтусов.",
  },
  {
    icon: PaintBucket,
    title: "Очистка от следов ремонта",
    text: "Снимаем плёнку, отмываем краску, клей и цемент с окон, дверей и полов.",
  },
  {
    icon: Sparkles,
    title: "Финальная полировка",
    text: "Моем окна, зеркала и сантехнику до блеска, готовим квартиру к заселению.",
  },
];

const faqs = [
  {
    q: "Сколько стоит уборка после ремонта в Астане?",
    a: "Стоимость начинается от 850 ₸ за м². Итоговая цена зависит от площади, объёма строительного мусора и степени загрязнения — точный расчёт дадим после уточнения деталей ремонта.",
  },
  {
    q: "Сколько времени занимает уборка после ремонта?",
    a: "В среднем 6–10 часов для квартиры площадью 60–80 м². Для больших объектов или капитального ремонта направляем бригаду из 2–3 клинеров, чтобы уложиться в один день.",
  },
  {
    q: "Вывозите ли вы строительный мусор?",
    a: "Мы убираем остатки материалов, упаковку и мелкий строительный мусор в процессе уборки. Вывоз крупногабаритного мусора (мешки со смесью, обрезки гипсокартона) обсуждается отдельно.",
  },
  {
    q: "Снимаете ли вы защитную плёнку с окон и дверей?",
    a: "Да, снятие плёнки со стеклопакетов, подоконников и дверных полотен входит в стандартную уборку после ремонта.",
  },
  {
    q: "Можно ли заказать уборку сразу после укладки полов и покраски?",
    a: "Рекомендуем подождать минимум 24 часа после покраски и укладки напольных покрытий, чтобы поверхности полностью высохли и мы могли безопасно их обработать.",
  },
  {
    q: "Какими средствами вы удаляете следы краски и клея?",
    a: "Используем специализированные эко-средства для удаления строительных загрязнений — они эффективны против цемента, клея и краски, но безопасны для поверхностей и не оставляют резкого запаха.",
  },
];

export function UborkaPosleRemontaAstana() {
  useDocumentMeta({ title: TITLE, description: DESCRIPTION, path: PATH });

  const schema = buildServiceSchema({
    name: "Уборка после ремонта в Астане",
    description: DESCRIPTION,
    path: PATH,
    priceFrom: 850,
  });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Уборка после ремонта" }]} />
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="mb-4">Уборка после ремонта в Астане</h1>
            <p className="text-lg text-gray-600 mb-2">Цена от 850 ₸/м²</p>
            <p className="text-gray-600 mb-8">
              Пыль, следы краски и клея, мойка окон — квартира готова к заселению
            </p>
            <Link
              to="#zayavka"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
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
          После ремонта в квартире остаётся мелкая строительная пыль, которая оседает
          буквально на всём — от потолка до внутренностей шкафов, — а также следы краски,
          клея и цемента на окнах, дверях и полах. Обычная влажная уборка с этим не
          справляется: пыль поднимается заново, а строительные загрязнения требуют
          специальных средств. EcoVibe выполняет полную уборку после ремонта в Астане —
          от снятия защитной плёнки со стеклопакетов до финальной полировки сантехники.
          Мы работаем как с косметическим, так и с капитальным ремонтом, приезжаем со своим
          профессиональным оборудованием (промышленные пылесосы, специализированная химия)
          и оставляем квартиру полностью готовой к заселению или переезду мебели.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Строительная пыль после ремонта — не просто эстетическая проблема. Она забивается в
          щели напольных покрытий, оседает внутри вытяжки и системы вентиляции, скапливается на
          лопастях люстр и вентиляторов. Если не убрать её профессионально, часть пыли будет
          подниматься в воздух ещё несколько недель после заселения. Поэтому мы обрабатываем
          не только видимые поверхности, но и труднодоступные места — верх шкафов, зазоры за
          батареями, пространство под ванной.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Оптимально заказывать уборку после ремонта за 1–2 дня до заселения или доставки
          мебели — тогда пыль уже не оседает заново на расставленные вещи. Если ремонт
          выполнялся поэтапно (например, сначала одна комната, затем остальные), можем убрать
          только завершённые зоны, не затрагивая помещения, где работы ещё продолжаются.
        </p>
      </section>

      {/* What's included */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">Что входит в уборку после ремонта</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {included.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white p-4 rounded-lg">
                <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stages */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-12">Этапы уборки после ремонта</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {stages.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="bg-orange-50 p-6 rounded-xl text-center">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-7 h-7 text-orange-600" />
              </div>
              <p className="text-xs font-semibold text-orange-600 mb-1">Этап {i + 1}</p>
              <h3 className="mb-2 text-sm font-semibold">{title}</h3>
              <p className="text-sm text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">Почему выбирают EcoVibe</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white rounded-xl">
              <SprayCan className="w-10 h-10 text-orange-600 mx-auto mb-3" />
              <h3 className="mb-2 text-sm font-semibold">Спецсредства</h3>
              <p className="text-sm text-gray-600">
                Удаляем цемент, клей и краску без повреждения поверхностей
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl">
              <ShieldCheck className="w-10 h-10 text-orange-600 mx-auto mb-3" />
              <h3 className="mb-2 text-sm font-semibold">Гарантия результата</h3>
              <p className="text-sm text-gray-600">
                Если что-то упустили — бесплатно доработаем в течение суток
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl">
              <Truck className="w-10 h-10 text-orange-600 mx-auto mb-3" />
              <h3 className="mb-2 text-sm font-semibold">Бригада для больших объектов</h3>
              <p className="text-sm text-gray-600">
                Направляем 2–3 клинеров, чтобы завершить уборку за один день
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Preparation tips */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <h2 className="text-center mb-6">Как подготовиться к уборке</h2>
        <p className="text-gray-700 leading-relaxed">
          Уберите крупные обрезки материалов и упаковку от мебели и техники — это ускорит
          работу клинера и снизит стоимость, если оплата рассчитывается с учётом объёма
          мусора. Если ремонт делали подрядчики, уточните у них, высохли ли краска и
          напольное покрытие — влажные поверхности мы обрабатываем осторожнее и с меньшим
          количеством влаги, чтобы не повредить свежий ремонт.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Для больших объектов (от 100 м² или несколько этажей дома) рекомендуем бронировать
          уборку минимум за 2–3 дня, чтобы мы могли выделить бригаду нужного размера и
          согласовать доступ на объект.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Отдельно уточняйте, нужна ли уборка с частичной меблировкой: если в квартире уже
          стоит часть мебели, мы аккуратно защищаем её плёнкой на время работы с пылью и
          химией, чтобы не оставить разводов на новых поверхностях.
        </p>
        <p className="text-gray-700 leading-relaxed">
          После завершения работ клинер проходит с вами по квартире и показывает результат —
          вы можете сразу указать на пропущенные места, и мастер доработает их на месте, не
          дожидаясь отдельного визита.
        </p>
      </section>

      <ServiceFAQSection faqs={faqs} />

      {/* CTA + form */}
      <section id="zayavka" className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="mb-4">Закажите уборку после ремонта</h2>
            <p className="text-gray-600 mb-6">
              Оставьте заявку — уточним площадь и объём работ, рассчитаем точную стоимость.
              Смотрите также{" "}
              <Link to="/generalnaya-uborka" className="text-orange-700 underline underline-offset-2 hover:text-orange-800">
                генеральную уборку
              </Link>{" "}
              и{" "}
              <Link to="/uborka-kvartir-astana" className="text-orange-700 underline underline-offset-2 hover:text-orange-800">
                уборку квартир
              </Link>
              .
            </p>
          </div>
          <ServiceLeadForm serviceType="Уборка после ремонта" accent="orange" />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
