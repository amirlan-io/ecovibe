import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useDocumentMeta } from "../utils/useDocumentMeta";
import { Breadcrumbs } from "../components/Breadcrumbs";

const sections = [
  {
    title: "1. Общие положения",
    content: (
      <p>
        Оставляя заявку на сайте ecovibe.kz (или ecovibe-pi.vercel.app), вы соглашаетесь с
        настоящей Политикой конфиденциальности. Мы заботимся о безопасности ваших данных и
        используем их исключительно для качественного оказания услуг.
      </p>
    ),
  },
  {
    title: "2. Какие данные мы собираем",
    content: (
      <>
        <p className="mb-3">
          Мы запрашиваем только минимально необходимый набор данных для организации клининга:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Ваше имя (для обращения менеджера);</li>
          <li>Номер телефона (для подтверждения заказа и связи в WhatsApp);</li>
          <li>Адрес (исключительно для выезда клининговой бригады).</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Цель обработки данных",
    content: (
      <>
        <p className="mb-3">Ваши данные используются только для:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Обработки и фиксации вашей заявки в нашей внутренней CRM-системе;</li>
          <li>Связи менеджера с вами для уточнения деталей уборки;</li>
          <li>Передачи чек-листа клинерам.</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Безопасность и конфиденциальность",
    content: (
      <p>
        Мы гарантируем, что ваши персональные данные хранятся в защищенной базе, никогда не
        передаются третьим лицам, не продаются и не используются для спам-рассылок. Проект носит
        социальный характер, и защита доверия наших клиентов — наш главный приоритет.
      </p>
    ),
  },
  {
    title: "5. Изменение и удаление данных",
    content: (
      <p>
        Если вы хотите изменить свои данные или полностью удалить их из нашей базы, просто
        свяжитесь с нашим менеджером по телефону{" "}
        <a
          href="tel:+77073204199"
          className="text-green-600 hover:text-green-700 underline underline-offset-2"
        >
          +7 707 320 41 99
        </a>
        , указанному на сайте.
      </p>
    ),
  },
];

export function Privacy() {
  useDocumentMeta({
    title: "Политика конфиденциальности | EcoVibe.kz",
    description:
      "Политика конфиденциальности и обработки персональных данных клинингового сервиса EcoVibe.kz в Астане.",
    path: "/privacy",
  });

  return (
    <div id="privacy-top">
      <Breadcrumbs items={[{ label: "Политика конфиденциальности" }]} />
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl leading-tight">
              Политика конфиденциальности и обработки персональных данных клинингового сервиса
              EcoVibe
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10 text-gray-700 leading-relaxed">
            {sections.map((section, index) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <div className="text-base">{section.content}</div>
              </motion.article>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Назад на главную
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
