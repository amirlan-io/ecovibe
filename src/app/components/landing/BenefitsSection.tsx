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
        <div className="mt-8 grid grid-cols-2 gap-3 md:mt-12 md:gap-6 lg:grid-cols-4">
          {BENEFITS.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="flex flex-col items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 md:p-6 md:hover:-translate-y-1 md:hover:shadow-lg"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 md:h-12 md:w-12">
                  <Icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <h3 className="text-sm font-semibold leading-tight md:text-base">{item.title}</h3>
                <p className="hidden text-sm leading-relaxed text-gray-600 md:block">{item.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
