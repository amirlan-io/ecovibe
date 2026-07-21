import { Link } from "react-router";
import {
  Check,
  ChevronRight,
  Sparkles,
  Home,
  Hammer,
  Leaf,
  ShieldCheck,
  Clock,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useDocumentMeta } from "../utils/useDocumentMeta";
import { ServiceFAQSection } from "../components/landing/ServiceFAQSection";
import { ServiceLeadForm } from "../components/ServiceLeadForm";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { buildServiceSchema } from "../utils/serviceSchema";

const PATH = "/uborka-kvartir-astana";
const TITLE = "Уборка квартир в Астане | Цены от 7 000 ₸ | EcoVibe.kz";
const DESCRIPTION =
  "Уборка квартир в Астане: поддерживающая, генеральная и после ремонта. Эко-средства, обученные клинеры, выезд мастера в день заявки. Цены и расчёт стоимости онлайн.";

const serviceTypes = [
  {
    to: "/vlazhnaya-uborka",
    title: "Поддерживающая уборка",
    price: "от 7 000 ₸",
    desc: "Регулярная уборка для поддержания порядка: полы, пыль, санузел, кухня.",
  },
  {
    to: "/generalnaya-uborka",
    title: "Генеральная уборка",
    price: "от 15 000 ₸",
    desc: "Глубокая очистка всех поверхностей, труднодоступных мест, техники внутри.",
  },
  {
    to: "/uborka-posle-remonta-astana",
    title: "Уборка после ремонта",
    price: "от 850 ₸/м²",
    desc: "Удаление строительной пыли, следов краски и клея, финальная полировка.",
  },
];

const included = [
  "Влажная и сухая уборка полов во всех комнатах",
  "Протирка пыли с мебели, подоконников и техники",
  "Мойка сантехники, кафеля и зеркал в санузле",
  "Уборка кухни: плита, фартук, раковина, фасады",
  "Вынос мусора и застилание постели",
  "Протирка дверей, выключателей и ручек",
  "Уборка балкона от пыли и мусора",
  "Мытьё зеркал и стеклянных поверхностей",
];

const steps = [
  {
    icon: Home,
    title: "Оставляете заявку",
    text: "Указываете адрес, площадь и удобное время — на сайте, по телефону или в WhatsApp.",
  },
  {
    icon: Clock,
    title: "Рассчитываем стоимость",
    text: "Называем точную цену за 5 минут, без скрытых доплат при выезде.",
  },
  {
    icon: Users,
    title: "Выезжает клинер",
    text: "Мастер приезжает со своим оборудованием и эко-средствами в согласованное время.",
  },
  {
    icon: Sparkles,
    title: "Уборка и приёмка",
    text: "После завершения вы проверяете качество — при необходимости мы бесплатно доработаем.",
  },
];

const faqs = [
  {
    q: "Сколько стоит уборка квартиры в Астане?",
    a: "Поддерживающая уборка — от 7 000 ₸, генеральная — от 15 000 ₸, уборка после ремонта — от 850 ₸/м². Точная цена зависит от площади, количества комнат и состояния квартиры — рассчитаем за 5 минут по телефону или в форме на сайте.",
  },
  {
    q: "Как быстро можно вызвать клинера?",
    a: "В большинстве случаев мастер может приехать в день заявки. Для генеральной уборки и уборки после ремонта рекомендуем бронировать за 1–2 дня, чтобы выбрать удобное время.",
  },
  {
    q: "Какими средствами вы убираете?",
    a: "Используем гипоаллергенные эко-средства, безопасные для детей и домашних животных. Всё оборудование и химию клинер привозит с собой.",
  },
  {
    q: "Нужно ли быть дома во время уборки?",
    a: "Нет, необязательно. Многие клиенты оставляют ключи консьержу или у соседей — мы работаем по договорённости и сообщаем о завершении.",
  },
  {
    q: "Кто будет убирать мою квартиру?",
    a: "Наши клинеры — обученные специалисты, часть из них глухие и слабослышащие. Это наш социальный проект: мы даём стабильную работу людям с инвалидностью по слуху, а вы получаете тихую и сосредоточенную уборку без лишних разговоров.",
  },
  {
    q: "Что если результат не понравится?",
    a: "Мы даём гарантию качества: если что-то упустили, бесплатно переделаем в течение 24 часов после уборки.",
  },
];

export function UborkaKvartirAstana() {
  useDocumentMeta({ title: TITLE, description: DESCRIPTION, path: PATH });

  const schema = buildServiceSchema({
    name: "Уборка квартир в Астане",
    description: DESCRIPTION,
    path: PATH,
    priceFrom: 7000,
  });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Уборка квартир" }]} />
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="mb-4">Уборка квартир в Астане</h1>
            <p className="text-lg text-gray-600 mb-2">
              Поддерживающая, генеральная и после ремонта — от 7 000 ₸
            </p>
            <p className="text-gray-600 mb-8">
              Эко-средства · Обученные клинеры · Выезд в день заявки
            </p>
            <Link
              to="#zayavka"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors"
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
          EcoVibe — клининговая компания в Астане, которая убирает квартиры любой площади:
          от студии до большого дома. Мы работаем с гипоаллергенными эко-средствами,
          безопасными для детей и питомцев, и привозим всё необходимое оборудование с собой,
          так что вам не нужно ничего готовить заранее. Каждый клинер проходит обучение и
          работает по единому чек-листу, поэтому результат не зависит от того, кто именно
          приехал на объект. Часть наших специалистов — глухие и слабослышащие мастера: это
          наш социальный проект по трудоустройству людей с инвалидностью по слуху, а для вас
          это ещё и максимально тихая, сосредоточенная уборка без отвлекающих разговоров.
          Мы принимаем заявки на уборку квартир по всей Астане и обычно можем прислать мастера
          уже в день обращения.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Уборка квартиры — это не универсальная услуга: студии после короткой аренды,
          семейные квартиры с детьми и животными и большие дома после капитального ремонта
          требуют разного подхода. Поэтому мы предлагаем три формата — поддерживающий,
          генеральный и после ремонта — и помогаем выбрать подходящий уже на этапе заявки.
          Если вы не уверены, какой вариант нужен именно вам, опишите ситуацию менеджеру по
          телефону или в WhatsApp: мы подскажем оптимальный формат и точно рассчитаем
          стоимость с учётом площади, количества комнат и состояния квартиры.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Стоимость уборки квартиры в Астане складывается из нескольких факторов: площади и
          планировки, количества санузлов, степени загрязнения и выбранных дополнительных
          услуг — мойки окон, химчистки дивана или уборки балкона. Мы не берём доплату за
          выезд по городу и не меняем цену на месте без предварительного согласования: сумма,
          которую мы называем при расчёте, и есть итоговая стоимость уборки.
        </p>
      </section>

      {/* Service types */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-4">Виды уборки квартир</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Подберите формат под свою задачу — от еженедельной поддержки порядка до
            генеральной уборки после стройки
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {serviceTypes.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="mb-2">{s.title}</h3>
                <p className="text-green-700 font-semibold mb-3">{s.price}</p>
                <p className="text-sm text-gray-600 mb-4">{s.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm text-green-700">
                  Подробнее <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-12">Что входит в уборку квартиры</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {included.map((item) => (
            <div key={item} className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
              <Check className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">Как проходит уборка</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="bg-white p-6 rounded-xl text-center relative">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-green-700" />
                </div>
                <p className="text-xs font-semibold text-green-700 mb-1">Шаг {i + 1}</p>
                <h3 className="mb-2 text-sm font-semibold">{title}</h3>
                <p className="text-sm text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-12">Почему выбирают EcoVibe</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6">
            <Leaf className="w-10 h-10 text-green-700 mx-auto mb-3" />
            <h3 className="mb-2 text-sm font-semibold">Безопасная химия</h3>
            <p className="text-sm text-gray-600">
              Без резких запахов — подходит для семей с детьми и животными
            </p>
          </div>
          <div className="text-center p-6">
            <ShieldCheck className="w-10 h-10 text-green-700 mx-auto mb-3" />
            <h3 className="mb-2 text-sm font-semibold">Гарантия качества</h3>
            <p className="text-sm text-gray-600">
              Не понравился результат — бесплатно переделаем в течение суток
            </p>
          </div>
          <div className="text-center p-6">
            <Hammer className="w-10 h-10 text-green-700 mx-auto mb-3" />
            <h3 className="mb-2 text-sm font-semibold">Своё оборудование</h3>
            <p className="text-sm text-gray-600">
              Привозим пылесосы, тряпки и средства — вам ничего готовить не нужно
            </p>
          </div>
        </div>
      </section>

      {/* Coverage & tips */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <h2 className="text-center mb-6">Район не важен — работаем по всей Астане</h2>
        <p className="text-gray-700 leading-relaxed">
          Мы выезжаем на уборку квартир во все районы города — Есиль, Алматы, Сарыарка,
          Байконур и Нура, включая новостройки на окраинах. Выезд мастера в пределах города
          бесплатный и не влияет на итоговую стоимость уборки. Если квартира находится в
          жилом комплексе с пропускной системой, укажите это в комментарии к заявке — заранее
          согласуем время с охраной или консьержем, чтобы клинер не терял время на въезде.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Для комфортной работы клинера достаточно освободить доступ к комнатам и убрать
          хрупкие или ценные вещи в шкаф — остальное мастер сделает сам. Если в квартире есть
          животные, предупредите об этом заранее: мы подбираем средства без резкого запаха,
          но лучше, если питомец на время уборки будет в отдельной комнате.
        </p>
      </section>

      <ServiceFAQSection faqs={faqs} className="py-16 bg-gray-50" />

      {/* CTA + form */}
      <section id="zayavka" className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="mb-4">Закажите уборку квартиры в Астане</h2>
            <p className="text-gray-600 mb-6">
              Оставьте заявку — перезвоним и согласуем удобное время в течение 15 минут.
              Также перелинковка на смежные услуги:{" "}
              <Link to="/himchistka-mebeli-astana" className="text-green-700 underline underline-offset-2 hover:text-green-800">
                химчистка мебели
              </Link>{" "}
              и{" "}
              <Link to="/uborka-ofisov-astana" className="text-green-700 underline underline-offset-2 hover:text-green-800">
                уборка офисов
              </Link>
              .
            </p>
          </div>
          <ServiceLeadForm serviceType="Уборка квартир" accent="green" />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
