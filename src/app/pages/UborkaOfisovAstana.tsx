import { Link } from "react-router";
import {
  Check,
  ChevronRight,
  Building2,
  CalendarClock,
  FileText,
  ShieldCheck,
  Moon,
  Leaf,
} from "lucide-react";
import { motion } from "motion/react";
import { useDocumentMeta } from "../utils/useDocumentMeta";
import { ServiceFAQSection } from "../components/landing/ServiceFAQSection";
import { ServiceLeadForm } from "../components/ServiceLeadForm";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { buildServiceSchema } from "../utils/serviceSchema";

const PATH = "/uborka-ofisov-astana";
const TITLE = "Уборка офисов в Астане | Разово и по договору | EcoVibe.kz";
const DESCRIPTION =
  "Уборка офисов в Астане: разовая и регулярная по договору. Рабочие места, переговорные, санузлы, кухня. Эко-средства, работа в нерабочее время. Расчёт стоимости онлайн.";

const formats = [
  {
    icon: CalendarClock,
    title: "Разовая уборка",
    text: "Генеральная уборка офиса перед важной встречей, после переезда или ремонта.",
  },
  {
    icon: FileText,
    title: "Регулярное обслуживание",
    text: "Ежедневная или еженедельная уборка по договору с фиксированной ценой и графиком.",
  },
  {
    icon: Moon,
    title: "Уборка вне рабочего времени",
    text: "Приезжаем рано утром, вечером или в выходные, чтобы не мешать сотрудникам.",
  },
];

const included = [
  "Уборка рабочих мест и столов",
  "Переговорные и зоны ресепшн",
  "Кухня/зона отдыха: столы, техника снаружи, раковина",
  "Санузлы: сантехника, зеркала, дезинфекция",
  "Мытьё полов и пылесос ковровых покрытий",
  "Протирка дверей, ручек и выключателей",
  "Вынос мусора и замена пакетов",
  "Мойка окон и подоконников (по запросу)",
];

const pricing = [
  { type: "Разовая уборка", size: "до 100 м²", price: "от 25 000 ₸" },
  { type: "Разовая уборка", size: "100–300 м²", price: "от 45 000 ₸" },
  { type: "Регулярная (по договору)", size: "любая площадь", price: "от 500 ₸/м²/визит" },
  { type: "После ремонта/переезда", size: "любая площадь", price: "от 850 ₸/м²" },
];

const faqs = [
  {
    q: "Сколько стоит уборка офиса в Астане?",
    a: "Разовая уборка небольшого офиса до 100 м² — от 25 000 ₸. Для регулярного обслуживания по договору цена рассчитывается индивидуально, в среднем от 500 ₸ за м² за визит — зависит от площади, частоты и объёма работ.",
  },
  {
    q: "Можно ли убирать офис в нерабочее время?",
    a: "Да, мы часто работаем рано утром, вечером после закрытия или по выходным, чтобы уборка не мешала сотрудникам и клиентам компании.",
  },
  {
    q: "Заключаете ли вы договор с юридическими лицами?",
    a: "Да, для регулярного обслуживания оформляем договор с актами выполненных работ — это удобно для бухгалтерии и подтверждения расходов.",
  },
  {
    q: "Как часто нужно убирать офис?",
    a: "Для небольших офисов обычно достаточно 2–3 раз в неделю, для офисов с высокой проходимостью клиентов рекомендуем ежедневную уборку. Подберём график под ваш график работы.",
  },
  {
    q: "Убираете ли вы после ремонта или переезда офиса?",
    a: "Да, выполняем уборку после ремонта или переезда: удаляем строительную пыль, моем окна и полы, приводим помещение в порядок перед началом работы.",
  },
  {
    q: "Предоставляете ли вы своё оборудование и химию?",
    a: "Да, клинер приезжает с профессиональным инвентарём и эко-средствами. Ничего закупать или готовить заранее не требуется.",
  },
];

export function UborkaOfisovAstana() {
  useDocumentMeta({ title: TITLE, description: DESCRIPTION, path: PATH });

  const schema = buildServiceSchema({
    name: "Уборка офисов в Астане",
    description: DESCRIPTION,
    path: PATH,
    priceFrom: 25000,
  });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Уборка офисов" }]} />
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="mb-4">Уборка офисов в Астане</h1>
            <p className="text-lg text-gray-600 mb-2">
              Разово или по договору — от 25 000 ₸
            </p>
            <p className="text-gray-600 mb-8">
              Работаем в удобное для бизнеса время, не мешая сотрудникам
            </p>
            <Link
              to="#zayavka"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
          EcoVibe убирает офисы, коворкинги и коммерческие помещения по всей Астане — от
          небольших кабинетов на 3–5 сотрудников до крупных open-space офисов на несколько
          этажей. Мы понимаем, что для бизнеса важны не только чистота, но и дисциплина: наши
          клинеры приезжают точно в согласованное время, работают аккуратно и не отвлекают
          сотрудников от работы. По запросу можем приезжать до начала рабочего дня, после его
          окончания или по выходным. Используем гипоаллергенные эко-средства без резкого
          запаха химии — это особенно важно для офисов с большим количеством людей в закрытом
          помещении. Для регулярного обслуживания заключаем договор и работаем по
          согласованному графику с актами выполненных работ.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Для бизнеса чистота офиса — это не только эстетика, но и часть репутации перед
          клиентами и партнёрами, а также элемент комфорта для сотрудников. Мы подбираем
          формат обслуживания под специфику компании: юридическим и финансовым офисам, где
          важна конфиденциальность документов, назначаем постоянную закреплённую команду
          клинеров; шоурумам и приёмным с высокой проходимостью клиентов — ежедневную уборку
          с акцентом на входную зону и санузлы; IT-компаниям и коворкингам с гибким графиком —
          вечернюю или ночную уборку, не пересекающуюся с рабочим временем.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Перед началом регулярного обслуживания менеджер выезжает на объект бесплатно, чтобы
          оценить площадь, типы напольных покрытий, количество рабочих мест и санузлов —
          на основе этого формируется индивидуальное коммерческое предложение с фиксированной
          ценой на весь срок договора.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Отдельное внимание уделяем санузлам и кухонным зонам — местам с наибольшей
          проходимостью и риском размножения бактерий. Используем дезинфицирующие средства,
          безопасные для поверхностей, но эффективные против микробов, и обновляем расходники
          (мыло, бумажные полотенца, освежители) по договорённости, если это включено в
          пакет обслуживания.
        </p>
      </section>

      {/* Formats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">Форматы уборки офисов</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {formats.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-12">Что входит в уборку офиса</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {included.map((item) => (
            <div key={item} className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
              <Check className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">Цены на уборку офисов</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 border-b border-gray-200">Услуга</th>
                  <th className="text-left p-4 border-b border-gray-200">Площадь</th>
                  <th className="text-left p-4 border-b border-gray-200 bg-blue-50">Цена</th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((row, i) => (
                  <tr key={row.type + row.size} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="p-4 border-b border-gray-200 font-medium">{row.type}</td>
                    <td className="p-4 border-b border-gray-200 text-gray-600">{row.size}</td>
                    <td className="p-4 border-b border-gray-200 font-medium bg-blue-50">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Точная стоимость зависит от площади, типа покрытий и частоты уборки — рассчитаем
            индивидуально по вашему объекту.
          </p>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-12">Почему бизнес выбирает EcoVibe</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6">
            <FileText className="w-10 h-10 text-blue-700 mx-auto mb-3" />
            <h3 className="mb-2 text-sm font-semibold">Договор и акты</h3>
            <p className="text-sm text-gray-600">
              Официальное оформление для юрлиц и подтверждение расходов
            </p>
          </div>
          <div className="text-center p-6">
            <ShieldCheck className="w-10 h-10 text-blue-700 mx-auto mb-3" />
            <h3 className="mb-2 text-sm font-semibold">Проверенные клинеры</h3>
            <p className="text-sm text-gray-600">
              Обученный персонал, работающий по чек-листам без присмотра
            </p>
          </div>
          <div className="text-center p-6">
            <Leaf className="w-10 h-10 text-blue-700 mx-auto mb-3" />
            <h3 className="mb-2 text-sm font-semibold">Эко-средства</h3>
            <p className="text-sm text-gray-600">
              Без резкого запаха химии — комфортно для сотрудников и клиентов
            </p>
          </div>
        </div>
      </section>

      {/* Practical tips */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <h2 className="text-center mb-6">Как начать сотрудничество</h2>
        <p className="text-gray-700 leading-relaxed">
          Для перехода на регулярное обслуживание не нужно расторгать текущий договор
          заранее — оставьте заявку, мы бесплатно выедем на объект, оценим объём работ и
          предложим дату начала. Если офис уже убирается штатным клинером или другой
          компанией, можем начать с разовой генеральной уборки, чтобы вы оценили качество
          перед подписанием договора на постоянной основе.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Оплата по договору — безналичная, с ежемесячным актом выполненных работ, что удобно
          для бухгалтерского учёта. Для разовых уборок принимаем оплату наличными или переводом
          в день выполнения работ.
        </p>
      </section>

      <ServiceFAQSection faqs={faqs} className="py-16 bg-gray-50" />

      {/* CTA + form */}
      <section id="zayavka" className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-8 h-8 text-blue-700" />
              <h2>Закажите уборку офиса в Астане</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Оставьте заявку — предложим удобный график и рассчитаем стоимость. Смотрите
              также{" "}
              <Link to="/uborka-kvartir-astana" className="text-blue-700 underline underline-offset-2 hover:text-blue-800">
                уборку квартир
              </Link>{" "}
              и{" "}
              <Link to="/uborka-posle-remonta-astana" className="text-blue-700 underline underline-offset-2 hover:text-blue-800">
                уборку после ремонта
              </Link>
              .
            </p>
          </div>
          <ServiceLeadForm serviceType="Уборка офисов" accent="blue" />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
