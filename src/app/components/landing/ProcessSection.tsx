const STEPS = [
  {
    num: "01",
    title: "Заявка",
    desc: "Оставьте заявку на сайте или в калькуляторе",
  },
  {
    num: "02",
    title: "Уточнение деталей",
    desc: "Менеджер свяжется для подтверждения времени",
  },
  {
    num: "03",
    title: "Клининг",
    desc: "Приезжает мастер чистоты и наводит порядок",
  },
  {
    num: "04",
    title: "Оплата",
    desc: "Вы принимаете работу и оплачиваете наличными или Kaspi",
  },
];

export function ProcessSection() {
  return (
    <section className="section-mobile bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="landing-h2 text-center font-bold">
          Как заказать уборку
        </h2>
        <ol className="mt-8 grid grid-cols-2 gap-6 overflow-visible md:mt-12 md:grid-cols-4 md:gap-8">
          {STEPS.map((step, index) => (
            <li key={step.num} className="relative overflow-visible text-center">
              {index < STEPS.length - 1 && (
                <div
                  className="absolute left-[calc(50%+2rem)] top-8 hidden h-0.5 w-[calc(100%-4rem)] bg-green-200 md:block"
                  aria-hidden
                />
              )}
              <div className="relative z-10 mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-base font-bold text-white md:mb-4 md:h-16 md:w-16 md:text-lg">
                {step.num}
              </div>
              <h3 className="mb-1 text-sm font-semibold md:mb-2 md:text-base">{step.title}</h3>
              <p className="text-xs leading-snug text-gray-600 md:text-sm">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
