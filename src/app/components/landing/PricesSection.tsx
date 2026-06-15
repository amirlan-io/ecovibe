import { AnchorLink } from "../AnchorLink";
import { SECTIONS } from "../../utils/sections";

const PRICE_CARDS = [
  {
    title: "Поддерживающая",
    rate: "550 ₸ / м²",
    from: "от 8 000 ₸",
    desc: "Регулярная уборка для поддержания чистоты",
    features: ["Полы и пыль", "Кухня и санузел", "Эко-средства"],
  },
  {
    title: "Генеральная",
    rate: "650 ₸ / м²",
    from: "от 15 000 ₸",
    desc: "Глубокая уборка всей квартиры",
    features: ["Труднодоступные места", "Кухня и техника", "Окна и подоконники"],
    highlight: true,
  },
  {
    title: "После ремонта",
    rate: "850 ₸ / м²",
    from: "от 20 000 ₸",
    desc: "Удаление строительной пыли и финальная чистка",
    features: ["Строительная пыль", "Окна и стекло", "Все помещения"],
  },
];

const EXTRAS = [
  { name: "Мойка окон", price: "4 000 ₸ / окно" },
  { name: "Химчистка дивана", price: "от 10 000 ₸" },
  { name: "Уборка балкона", price: "5 000 ₸" },
];

export function PricesSection() {
  return (
    <section id="prices" className="scroll-mt-20 bg-gradient-to-b from-green-50/80 to-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          Прозрачные цены на клининг в Астане
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
          Фиксированные тарифы за м² — точную сумму рассчитает калькулятор
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PRICE_CARDS.map((card) => (
            <article
              key={card.title}
              className={`flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:shadow-xl ${
                card.highlight
                  ? "border-green-600 bg-white shadow-lg ring-2 ring-green-600/20"
                  : "border-gray-200 bg-white"
              }`}
            >
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="mt-1 text-2xl font-bold text-green-700">{card.rate}</p>
              <p className="text-sm text-gray-500">{card.from}</p>
              <p className="mt-3 text-sm text-gray-600">{card.desc}</p>
              <ul className="mt-4 flex-1 space-y-2">
                {card.features.map((f) => (
                  <li key={f} className="text-sm text-gray-600">
                    • {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="mb-4 font-semibold">Дополнительные услуги</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {EXTRAS.map((extra) => (
              <div
                key={extra.name}
                className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-sm"
              >
                <span>{extra.name}</span>
                <span className="font-medium text-green-700">{extra.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <AnchorLink
            sectionId={SECTIONS.calculator}
            className="inline-flex rounded-xl bg-green-600 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-green-700"
          >
            Рассчитать точную стоимость
          </AnchorLink>
        </div>
      </div>
    </section>
  );
}
