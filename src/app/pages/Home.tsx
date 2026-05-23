import { Link } from "react-router";
import { Droplet, Sparkles, Check, Star, Leaf, Shield, Clock, Award, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import heroImg from "../../imports/______________2026-05-20___13.14.25.png";
import { BookingCalculator } from "../components/BookingCalculator";
import { CalculatorLink } from "../components/CalculatorLink";
import { FAQ } from "../components/FAQ";

export function Home() {
  const services = [
    {
      icon: Droplet,
      name: "Влажная уборка",
      description: "Поддерживающая уборка для чистоты и свежести",
      features: ["Моем полы", "Протираем поверхности", "Уборка санузла"],
      price: "от 8 000 тг",
      href: "/wet-cleaning",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Sparkles,
      name: "Генеральная уборка",
      description: "Глубокая очистка всей квартиры",
      features: ["Кухня и техника", "Окна и подоконники", "Труднодоступные места"],
      price: "от 15 000 тг",
      href: "/general-cleaning",
      color: "from-amber-500 to-orange-500",
    },
  ];

  const steps = [
    { number: "01", title: "Оставляете заявку", desc: "По телефону, WhatsApp или на сайте" },
    { number: "02", title: "Выбираете день и время", desc: "Мы подберем удобный для вас график" },
    { number: "03", title: "Мастер приезжает и убирает", desc: "С профессиональным оборудованием" },
    { number: "04", title: "Вы принимаете работу", desc: "Гарантия качества результата" },
  ];

  const benefits = [
    {
      icon: Leaf,
      title: "Eco-средства",
      desc: "Безопасно для детей и питомцев",
    },
    {
      icon: Shield,
      title: "Гарантия качества",
      desc: "Переделаем бесплатно, если нужно",
    },
    {
      icon: Clock,
      title: "Удобный график",
      desc: "Работаем 7 дней в неделю",
    },
    {
      icon: Award,
      title: "Опытные мастера",
      desc: "Проверены и обучены",
    },
  ];

  const reviews = [
    {
      name: "Асель К.",
      service: "Генеральная уборка",
      rating: 5,
      text: "Отличная команда! Квартира сияет. Особенно приятно, что используют безопасные средства.",
    },
    {
      name: "Дмитрий М.",
      service: "Влажная уборка",
      rating: 5,
      text: "Быстро, качественно, без лишних вопросов. Буду заказывать регулярно.",
    },
    {
      name: "Гульнара С.",
      service: "Генеральная уборка",
      rating: 5,
      text: "Очень доволен социальной миссией компании. Качество работы на высоте!",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-6">
                Чистота вашего дома — наша работа
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Идеальная чистота в Астане с заботой о людях. Наши клинеры — люди с нарушениями слуха. Они невероятно сфокусированы на мелочах, работают в абсолютной тишине и не отвлекаются на разговоры. Используем только безопасные эко-средства.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <CalculatorLink className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 font-medium text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl">
                  Оставить заявку
                </CalculatorLink>
                <Link
                  to="/prices"
                  className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:border-green-600 hover:text-green-600 transition-colors"
                >
                  Узнать цены
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>500+ довольных клиентов</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>100% eco-средства</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square overflow-hidden rounded-3xl shadow-xl ring-1 ring-green-100/80">
                <img
                  src={heroImg}
                  alt="Профессиональный сотрудник EcoVibe"
                  className="h-full w-full rounded-3xl object-cover shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Calculator Section */}
      <section
        id="calculator"
        className="scroll-mt-20 py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-green-50"
        data-calculator
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
          <BookingCalculator />
        </div>
      </section>

      <FAQ />

      {/* Services Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-4">Наши услуги</h2>
        <p className="text-center text-gray-600 mb-12">
          Выберите подходящий вариант уборки
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">{service.price}</span>
                  <Link
                    to={service.href}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Подробнее
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">Как мы работаем</h2>
          <div className="grid gap-8 sm:grid-cols-2 md:flex md:items-start md:justify-between md:gap-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-1 text-center"
              >
                <div className="mb-4 flex w-full items-center justify-center">
                  {index > 0 && (
                    <div
                      className="hidden md:block h-0 flex-1 border-t-2 border-green-200"
                      aria-hidden
                    />
                  )}
                  <div className="relative z-10 mx-2 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className="hidden md:block h-0 flex-1 border-t-2 border-green-200"
                      aria-hidden
                    />
                  )}
                </div>
                <h4 className="mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why EcoVibe Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-12">Почему EcoVibe</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="mb-2">{benefit.title}</h4>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-4">Отзывы клиентов</h2>
          <p className="text-center text-gray-600 mb-12">
            Что говорят наши клиенты
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{review.text}</p>
                <div>
                  <p className="font-medium">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.service}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-green-600 to-emerald-600 p-12 text-center">
          <h2 className="mb-4 text-white">Готовы к чистоте?</h2>
          <p className="mb-8 text-lg text-green-50">
            Закажите уборку прямо сейчас или напишите нам в WhatsApp
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CalculatorLink className="rounded-lg bg-white px-8 py-3 font-medium text-green-700 shadow-sm transition-colors hover:bg-stone-100">
              Заказать уборку
            </CalculatorLink>
            <a
              href="https://wa.me/77073204199"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-colors font-medium flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
