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
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          Как заказать уборку
        </h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.num} className="relative text-center">
              {index < STEPS.length - 1 && (
                <div
                  className="absolute left-[calc(50%+2rem)] top-8 hidden h-0.5 w-[calc(100%-4rem)] bg-green-200 md:block"
                  aria-hidden
                />
              )}
              <div className="relative z-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white">
                {step.num}
              </div>
              <h3 className="mb-2 font-semibold">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
