import { Leaf, Users, Award, Heart, Star, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { useDocumentMeta } from "../utils/useDocumentMeta";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function About() {
  useDocumentMeta({
    title: "О компании EcoVibe | Клининг с социальной миссией в Астане",
    description:
      "EcoVibe — клининговая компания в Астане с социальной миссией: трудоустраиваем глухих и слабослышащих специалистов. Узнайте больше о нашей команде и принципах работы.",
    path: "/o-nas",
  });

  const stats = [
    { number: "500+", label: "Довольных клиентов" },
    { number: "3", label: "Года на рынке Астаны" },
    { number: "100%", label: "Eco-средства" },
    { number: "4.9", label: "Рейтинг на 2ГИС" },
  ];

  const ecoFeatures = [
    {
      title: "Безопасные составы",
      desc: "Используем только сертифицированные eco-средства без агрессивной химии",
    },
    {
      title: "Гипоаллергенно",
      desc: "Подходит для семей с детьми, беременными и людьми с аллергией",
    },
    {
      title: "Для животных",
      desc: "Абсолютно безопасно для ваших питомцев",
    },
    {
      title: "Экологично",
      desc: "Биоразлагаемые компоненты, забота об окружающей среде",
    },
  ];

  return (
    <div>
      <Breadcrumbs items={[{ label: "О компании" }]} />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="mb-4">О EcoVibe</h1>
            <p className="text-lg text-gray-600">
              Профессиональная уборка с заботой о людях и природе
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-6">Наша история</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                EcoVibe была основана в 2022 году с четкой миссией: создать клининговую
                компанию, которая не только предоставляет качественные услуги, но и вносит
                вклад в развитие общества.
              </p>
              <p>
                Все наши сотрудники — люди с нарушениями слуха. Мы убеждены, что
                профессионализм не зависит от физических особенностей, и наша команда
                доказывает это каждый день своей работой.
              </p>
              <p>
                Мы выбрали eco-подход, потому что верим в ответственное отношение к
                окружающей среде. Чистота вашего дома не должна наносить вред природе или
                здоровью ваших близких.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-xl text-center"
              >
                <div className="font-bold text-3xl text-purple-600 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Mission Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="mb-4">Наша социальная миссия</h2>
            <p className="text-lg text-gray-700">
              Мы создаем рабочие места для людей с нарушениями слуха, предоставляя им
              возможность реализовать свой профессиональный потенциал и обеспечить себя
              достойной работой.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl text-center">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="mb-2">Инклюзивность</h3>
              <p className="text-gray-600 text-sm">
                Создаем равные возможности для всех членов общества
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center">
              <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="mb-2">Профессионализм</h3>
              <p className="text-gray-600 text-sm">
                Регулярное обучение и повышение квалификации сотрудников
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center">
              <CheckCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="mb-2">Качество</h3>
              <p className="text-gray-600 text-sm">
                Строгий контроль качества на каждом этапе работы
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-12">Наши мастера</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Users className="w-16 h-16 text-white" />
            </div>
            <h3 className="mb-2">Проверенные специалисты</h3>
            <p className="text-sm text-gray-600">
              Каждый мастер проходит тщательный отбор и проверку
            </p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Award className="w-16 h-16 text-white" />
            </div>
            <h3 className="mb-2">Обучение</h3>
            <p className="text-sm text-gray-600">
              Регулярные тренинги по клинингу и работе с eco-средствами
            </p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Star className="w-16 h-16 text-white" />
            </div>
            <h3 className="mb-2">Форма и бейдж</h3>
            <p className="text-sm text-gray-600">
              Единая форма и идентификационные бейджи для каждого сотрудника
            </p>
          </div>
        </div>
      </section>

      {/* Eco Principles Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h2 className="mb-4">Eco-принципы</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Мы используем только проверенные и безопасные средства для уборки
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecoFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl"
              >
                <CheckCircle className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
