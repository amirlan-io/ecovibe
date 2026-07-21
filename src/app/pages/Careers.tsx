import { useState } from "react";
import { motion } from "motion/react";
import { PrivacyPolicyLink } from "../components/PrivacyPolicyLink";
import {
  Heart,
  Users,
  TrendingUp,
  Calendar,
  Award,
  Briefcase,
  Clock,
  Wallet,
  GraduationCap,
  Shield,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { formatPhoneNumber } from "../utils/phoneFormat";
import { useDocumentMeta } from "../utils/useDocumentMeta";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function Careers() {
  useDocumentMeta({
    title: "Вакансии клинера в Астане | Работа в EcoVibe.kz",
    description:
      "EcoVibe ищет клинеров в Астане, в том числе трудоустраивает глухих и слабослышащих специалистов. Стабильный доход, обучение, поддержка. Оставьте заявку на вакансию.",
    path: "/vakansii",
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    experience: "",
    district: "",
    comment: "",
  });

  const benefits = [
    {
      icon: Wallet,
      title: "Стабильный доход",
      desc: "От 150 000 до 300 000 тг в месяц в зависимости от объема работ",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Calendar,
      title: "Гибкий график",
      desc: "Работайте в удобное время. Выбирайте заказы, которые вам подходят",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: GraduationCap,
      title: "Обучение",
      desc: "Бесплатное обучение клинингу и работе с eco-средствами",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Дружный коллектив",
      desc: "Работайте в команде единомышленников. Взаимопомощь и поддержка",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Shield,
      title: "Официальное трудоустройство",
      desc: "Договор, социальные гарантии, страховка",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: Briefcase,
      title: "Весь инвентарь — наш",
      desc: "Не нужно покупать средства и оборудование. Мы предоставляем всё",
      color: "from-teal-500 to-green-500",
    },
  ];

  const requirements = [
    "Ответственность и пунктуальность",
    "Желание работать и зарабатывать",
    "Готовность к физическому труду",
    "Проживание в Астане",
    "Возраст от 18 лет",
  ];

  const earnings = [
    {
      title: "Влажная уборка",
      price: "550 ₸/м²",
      example: "Квартира 60 м² = 33 000 ₸",
      time: "2-4 часа",
    },
    {
      title: "Генеральная уборка",
      price: "650 ₸/м²",
      example: "Квартира 60 м² = 39 000 ₸",
      time: "4-6 часов",
    },
    {
      title: "После ремонта",
      price: "850 ₸/м²",
      example: "Квартира 60 м² = 51 000 ₸",
      time: "5-8 часов",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Формируем сообщение для WhatsApp
    let message = `💼 *Заявка на вакансию уборщика*\n\n`;
    message += `👤 *Имя:* ${formData.name}\n`;
    message += `📞 *Телефон:* ${formData.phone}\n`;
    message += `🎂 *Возраст:* ${formData.age} лет\n`;
    message += `💼 *Опыт работы:* ${formData.experience}\n`;
    message += `📍 *Район проживания:* ${formData.district}\n`;
    if (formData.comment) {
      message += `💬 *Комментарий:* ${formData.comment}\n`;
    }

    // Кодируем сообщение для URL
    const encodedMessage = encodeURIComponent(message);

    // Открываем WhatsApp с сообщением
    window.open(`https://wa.me/77073204199?text=${encodedMessage}`, "_blank");

    // Очищаем форму
    setFormData({
      name: "",
      phone: "",
      age: "",
      experience: "",
      district: "",
      comment: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: "Вакансии" }]} />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="mb-4">Работа в EcoVibe</h1>
            <p className="text-lg text-gray-600 mb-6">
              Присоединяйтесь к нашей команде профессионалов! Мы создаём рабочие места
              для людей с нарушениями слуха и гордимся нашей социальной миссией.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Официальное трудоустройство</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>До 300 000 ₸/месяц</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Гибкий график</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-4">Преимущества работы у нас</h2>
        <p className="text-center text-gray-600 mb-12">
          Почему стоит присоединиться к команде EcoVibe
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${benefit.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Earnings Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h2 className="mb-4">Сколько можно заработать?</h2>
            <p className="text-gray-600">
              Ваш доход зависит от количества заказов. Чем больше работаете — тем больше
              зарабатываете!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {earnings.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 border border-green-200"
              >
                <h3 className="mb-3">{item.title}</h3>
                <div className="mb-4">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {item.price}
                  </div>
                  <div className="text-sm text-gray-600">{item.example}</div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Время: {item.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-8 border-2 border-green-300">
            <h3 className="mb-4 text-center">Пример расчета месячного дохода</h3>
            <div className="space-y-3 max-w-2xl mx-auto">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">3 уборки в неделю по 35 000 ₸</span>
                <span className="font-medium">105 000 ₸/неделя</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">4 недели в месяц</span>
                <span className="font-medium">420 000 ₸/месяц</span>
              </div>
              <div className="flex justify-between items-center pt-3">
                <span className="font-medium">Итого за месяц:</span>
                <span className="text-2xl font-bold text-green-600">
                  ~420 000 ₸
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center mt-6">
              * Это примерный расчет. Реальный доход зависит от количества заказов и типа
              услуг
            </p>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="mb-6">Требования к кандидатам</h2>
            <ul className="space-y-3">
              {requirements.map((req) => (
                <li key={req} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 p-6 bg-purple-50 rounded-xl border border-purple-200">
              <h3 className="mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Опыт работы не обязателен
              </h3>
              <p className="text-sm text-gray-700">
                Мы обучим вас всему необходимому! Главное — желание работать и
                развиваться. Предоставляем полное обучение работе с eco-средствами и
                профессиональному клинингу.
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-6">Что входит в обучение?</h2>
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="mb-2">Техника уборки</h3>
                <p className="text-sm text-gray-600">
                  Правильные методы уборки разных типов помещений и поверхностей
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="mb-2">Работа с eco-средствами</h3>
                <p className="text-sm text-gray-600">
                  Безопасное использование профессиональных чистящих средств
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="mb-2">Использование оборудования</h3>
                <p className="text-sm text-gray-600">
                  Работа с пылесосами, пароочистителями и другой техникой
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="mb-2">Стандарты качества</h3>
                <p className="text-sm text-gray-600">
                  Контроль качества работы и общение с клиентами
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center">
              <h2 className="mb-2 text-white">Подать заявку на вакансию</h2>
              <p className="text-purple-100">
                Заполните форму, и мы свяжемся с вами в ближайшее время
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Как вас зовут?"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        const formatted = formatPhoneNumber(e.target.value);
                        setFormData((prev) => ({ ...prev, phone: formatted }));
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="+7 7__ ___ __ __"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium mb-2">
                      Возраст *
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      required
                      min="18"
                      max="70"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Полных лет"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium mb-2"
                    >
                      Опыт работы *
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Выберите...</option>
                      <option value="Нет опыта">Нет опыта</option>
                      <option value="До 1 года">До 1 года</option>
                      <option value="1-3 года">1-3 года</option>
                      <option value="Более 3 лет">Более 3 лет</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="district" className="block text-sm font-medium mb-2">
                    Район проживания в Астане *
                  </label>
                  <input
                    type="text"
                    id="district"
                    name="district"
                    required
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Например: Есиль, Алматы, Сарыарка"
                  />
                </div>

                <div>
                  <label htmlFor="comment" className="block text-sm font-medium mb-2">
                    Дополнительная информация
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    placeholder="Расскажите о себе, своем опыте или задайте вопросы..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  Отправить заявку в WhatsApp
                </button>

                <p className="text-center text-xs text-gray-500">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <PrivacyPolicyLink className="text-green-800 underline underline-offset-2 hover:text-green-700">
                    политикой конфиденциальности
                  </PrivacyPolicyLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white">
          <h2 className="mb-4 text-white">Остались вопросы?</h2>
          <p className="text-lg mb-8 text-purple-100">
            Свяжитесь с нами в WhatsApp, и мы с удовольствием ответим на все ваши
            вопросы о вакансии
          </p>
          <a
            href="https://wa.me/77073204199"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors font-medium shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Написать в WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
