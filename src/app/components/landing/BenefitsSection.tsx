import { Leaf, ShieldCheck, Sparkles, Wrench } from "lucide-react";

const BENEFITS = [
  {
    icon: Leaf,
    title: "Безопасная эко-химия",
    desc: "Без резких запахов и агрессивной химии — безопасно для детей и питомцев.",
  },
  {
    icon: Sparkles,
    title: "Обученный персонал",
    desc: "Клинеры прошли проверку, обучение и работают по чек-листам.",
  },
  {
    icon: ShieldCheck,
    title: "Материальная ответственность",
    desc: "Гарантируем сохранность ваших вещей и бережное отношение к интерьеру.",
  },
  {
    icon: Wrench,
    title: "Свой инвентарь",
    desc: "Привозим всё оборудование и профессиональные средства с собой.",
  },
];

export function BenefitsSection() {
  return (
    <section className="section-mobile bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="landing-h2 text-center font-bold">
          Почему Астанчане доверяют EcoVibe
        </h2>
        <div className="benefits-grid mt-12">
          {BENEFITS.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="landing-body text-gray-600">{item.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
