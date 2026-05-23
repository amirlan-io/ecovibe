import { Link } from "react-router";
import { Check, ChevronRight, Home, Users, Calendar, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export function WetCleaning() {
  const [rooms, setRooms] = useState<string>("2");

  const included = [
    "Моем полы",
    "Заправляем постель",
    "Протираем двери",
    "Чистим подоконники",
    "Убираем пыль в шкафах и на поверхностях",
    "Протираем плинтусы",
    "Полная уборка санузла",
    "Чистим балкон от пыли",
  ];

  const suitableFor = [
    "Поддерживающая уборка 1–2 раза в месяц",
    "После небольших праздников дома",
    "Нет времени убраться самому",
    "Хочется чистоты без генеральной",
  ];

  const faqs = [
    {
      q: "Сколько времени займёт уборка?",
      a: "В среднем 2-4 часа в зависимости от площади квартиры и степени загрязнения.",
    },
    {
      q: "Нужно ли быть дома?",
      a: "Необязательно. Вы можете оставить ключи или встретить мастера по договоренности.",
    },
    {
      q: "Какими средствами убираете?",
      a: "Мы используем только eco-friendly средства, безопасные для детей и животных.",
    },
    {
      q: "Что если что-то не понравится?",
      a: "Мы предоставляем гарантию качества и переделаем работу бесплатно.",
    },
  ];

  const prices: Record<string, { price: number; time: string }> = {
    studio: { price: 7000, time: "2-3 часа" },
    "1": { price: 8000, time: "2-3 часа" },
    "2": { price: 10000, time: "3-4 часа" },
    "3": { price: 12000, time: "4-5 часов" },
  };

  const selectedPrice = prices[rooms];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="mb-4">
              Влажная уборка квартиры в Астане
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Цена от 8 000 тг | Приедем сегодня
            </p>
            <p className="text-gray-600 mb-8">
              Профессиональная поддерживающая уборка для вашего комфорта
            </p>
            <Link
              to="/contacts"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Заказать сейчас
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="mb-6">Что входит в услугу</h2>
            <ul className="space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-6">Для кого подходит</h2>
            <div className="space-y-4">
              {suitableFor.map((item, index) => {
                const icons = [Home, Users, Calendar, Sparkles];
                const Icon = icons[index];
                return (
                  <div key={item} className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg">
                    <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-cyan-600" />
                    </div>
                    <p className="text-gray-700 mt-1">{item}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Price Calculator Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-8">Калькулятор цены</h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <label className="block mb-4">
              Выберите количество комнат
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { value: "studio", label: "Студия" },
                { value: "1", label: "1-комн" },
                { value: "2", label: "2-комн" },
                { value: "3", label: "3-комн" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setRooms(option.value)}
                  className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                    rooms === option.value
                      ? "border-cyan-600 bg-cyan-50 text-cyan-600"
                      : "border-gray-200 hover:border-cyan-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="bg-cyan-50 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Стоимость:</span>
                <span className="font-bold text-2xl text-cyan-600">
                  {selectedPrice.price.toLocaleString()} тг
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Примерное время:</span>
                <span>{selectedPrice.time}</span>
              </div>
            </div>
            <Link
              to="/contacts"
              className="block w-full text-center py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium"
            >
              Заказать за {selectedPrice.price.toLocaleString()} тг
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </section>

      {/* CTA Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-cyan-600 to-blue-600 rounded-3xl p-12 text-center text-white">
          <h2 className="mb-4 text-white">Готовы заказать влажную уборку?</h2>
          <p className="text-lg mb-8 text-cyan-50">
            Позвоним в течение 15 минут и согласуем удобное время
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contacts"
              className="px-8 py-3 bg-white text-cyan-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Оставить заявку
            </Link>
            <a
              href="https://wa.me/77073204199"
              className="px-8 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-400 transition-colors font-medium"
            >
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
