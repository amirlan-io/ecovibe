import { Link } from "react-router";
import { Check, ChevronRight, Home, Package, Building, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useDocumentMeta } from "../utils/useDocumentMeta";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { buildServiceSchema } from "../utils/serviceSchema";

const TITLE = "Генеральная уборка квартиры в Астане от 15 000 ₸ | EcoVibe.kz";
const DESCRIPTION =
  "Генеральная уборка квартиры в Астане: кухня, санузел, окна, труднодоступные места. От 15 000 ₸, выезд мастера в день заявки. Рассчитайте стоимость онлайн.";

export function GeneralCleaning() {
  useDocumentMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: "/generalnaya-uborka",
  });

  const schema = buildServiceSchema({
    name: "Генеральная уборка квартиры в Астане",
    description: DESCRIPTION,
    path: "/generalnaya-uborka",
    priceFrom: 15000,
  });

  const included = [
    "Глубокая очистка всех поверхностей",
    "Подоконники и оконные рамы",
    "Двери и дверные ручки",
    "Бытовая техника снаружи",
    "Кухня: фартук, плита, вытяжка, шкафы",
    "Санузел: плитка, сантехника, зеркало",
    "Полы + плинтусы",
    "Балкон от пыли и загрязнений",
    "Мебель, светильники, труднодоступные места",
    "Постель, вещи; холодильник и микроволновка",
  ];

  const suitableFor = [
    { icon: Home, text: "После ремонта или переезда" },
    { icon: Package, text: "Давно не делали генеральную" },
    { icon: Building, text: "Сдача/приём квартиры" },
    { icon: Sparkles, text: "Подготовка к большому событию" },
  ];

  const comparison = [
    { feature: "Протирка поверхностей", wet: "Основные", general: "Все + труднодоступные" },
    { feature: "Уборка кухни", wet: "Базовая", general: "Глубокая + техника" },
    { feature: "Санузел", wet: "Стандартная", general: "Плитка + фуги" },
    { feature: "Окна", wet: "Не входит", general: "Рамы + подоконники" },
    { feature: "Время", wet: "2-4 часа", general: "4-8 часов" },
    { feature: "Цена", wet: "от 7 000 тг", general: "от 15 000 тг" },
  ];

  const faqs = [
    {
      q: "Сколько занимает генеральная уборка?",
      a: "В зависимости от площади и состояния: от 4 до 8 часов. Для больших объектов можем направить бригаду из 2-3 человек.",
    },
    {
      q: "Сколько мастеров приедет?",
      a: "Обычно один мастер для 1-2 комнатных квартир, два и более для больших объектов.",
    },
    {
      q: "Нужно ли готовить квартиру?",
      a: "Желательно убрать ценные и хрупкие вещи. Остальное мы сделаем сами.",
    },
    {
      q: "Входит ли уборка внутри шкафов?",
      a: "Да, если вы предварительно освободите содержимое. Можем заказать как дополнительную опцию.",
    },
  ];

  return (
    <div>
      <Breadcrumbs items={[{ label: "Генеральная уборка" }]} />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="mb-4">
              Генеральная уборка квартиры в Астане
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Глубокая очистка · Кухня, санузел, балкон
            </p>
            <Link
              to="/kontakty"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Заказать сейчас
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-12">Что входит в услугу</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {included.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 bg-amber-50 p-4 rounded-lg"
            >
              <Check className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Suitable For Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">Для кого подходит</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {suitableFor.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="bg-white p-6 rounded-xl text-center"
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-amber-600" />
                </div>
                <p className="text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-12">Сравнение с влажной уборкой</h2>
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 border-b border-gray-200">Параметр</th>
                <th className="text-center p-4 border-b border-gray-200">Влажная уборка</th>
                <th className="text-center p-4 border-b border-gray-200 bg-amber-50">
                  Генеральная уборка
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, index) => (
                <tr key={row.feature} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-4 border-b border-gray-200 font-medium">{row.feature}</td>
                  <td className="p-4 border-b border-gray-200 text-center text-gray-600">
                    {row.wet}
                  </td>
                  <td className="p-4 border-b border-gray-200 text-center font-medium bg-amber-50">
                    {row.general}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link
            to="/#prices"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700"
          >
            Посмотреть все цены
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            to="/uborka-posle-remonta-astana"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700"
          >
            Уборка после ремонта
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            to="/uborka-kvartir-astana"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700"
          >
            Все виды уборки квартир
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">Часто задаваемые вопросы</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="bg-white border border-gray-200 rounded-lg p-6 group"
              >
                <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-3xl p-12 text-center text-white">
          <h2 className="mb-4 text-white">Готовы к генеральной уборке?</h2>
          <p className="text-lg mb-8 text-amber-50">
            Бесплатно выезжаем на оценку для больших объектов
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/kontakty"
              className="px-8 py-3 bg-white text-amber-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Оставить заявку
            </Link>
            <a
              href="https://wa.me/77073204199"
              className="px-8 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-400 transition-colors font-medium"
            >
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
