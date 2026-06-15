import heroImg from "../../../imports/______________2026-05-20___13.14.25.png";
import { CalculatorLink } from "../CalculatorLink";
import { Check } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      <img
        src={heroImg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/40"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Профессиональный эко-клининг в Астане от 15 000 ₸
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
            Используем гипоаллергенные средства, безопасные для детей и питомцев.
            Вернём блеск вашему дому уже сегодня!
          </p>
          <CalculatorLink className="mt-8 inline-flex items-center justify-center rounded-xl bg-green-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-green-500 hover:shadow-xl">
            Рассчитать стоимость
          </CalculatorLink>
          <div className="mt-8 flex flex-wrap gap-5 text-sm text-white/85">
            <span className="flex items-center gap-2">
              <Check className="h-5 w-5 shrink-0 text-green-400" />
              500+ довольных клиентов
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-5 w-5 shrink-0 text-green-400" />
              100% эко-средства
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
