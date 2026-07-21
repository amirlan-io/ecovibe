import { AnchorLink } from "../AnchorLink";
import { CalculatorLink } from "../CalculatorLink";
import { SECTIONS } from "../../utils/sections";
import { Check } from "lucide-react";

function HeroImage() {
  return (
    <div className="hero-image-arch relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
      <img
        src="/images/hero.webp"
        alt="Клинер EcoVibe — профессиональная уборка в Астане"
        className="h-full w-full object-cover object-top"
        loading="eager"
        fetchPriority="high"
        width={351}
        height={427}
        decoding="sync"
      />
    </div>
  );
}

function HeroCopy({ className }: { className?: string }) {
  return (
    <div className={className}>
      <h1 className="landing-h1 font-bold text-gray-900 md:text-4xl md:leading-tight lg:text-5xl xl:text-[3.25rem]">
        Профессиональный эко-клининг в Астане
      </h1>
      <p className="mt-2 text-2xl font-bold text-green-700 md:mt-4 md:text-3xl lg:text-4xl">
        от 7 000 ₸
      </p>
      <p className="landing-lead mt-5 text-gray-700 md:mt-6 md:text-lg">
        Используем гипоаллергенные средства, безопасные для детей и питомцев.
      </p>
      <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap md:mt-10">
        <CalculatorLink className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-green-700 px-8 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-green-600 min-[480px]:w-auto md:py-3.5">
          Рассчитать стоимость
        </CalculatorLink>
        <AnchorLink
          sectionId={SECTIONS.prices}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border-2 border-green-700 px-8 py-3 text-base font-semibold text-green-800 transition-colors hover:bg-green-700/10 min-[480px]:w-auto md:py-3.5"
        >
          Узнать цены
        </AnchorLink>
      </div>
      <div className="mt-8 flex flex-col gap-2 md:mt-10">
        <span className="flex items-center gap-2 text-sm text-gray-700 md:text-base">
          <Check className="h-5 w-5 shrink-0 text-green-700" />
          Эко-средства — безопасно для детей и питомцев
        </span>
        <span className="flex items-center gap-2 text-sm text-gray-700 md:text-base">
          <Check className="h-5 w-5 shrink-0 text-green-700" />
          Привозим своё профессиональное оборудование
        </span>
        <span className="flex items-center gap-2 text-sm text-gray-700 md:text-base">
          <Check className="h-5 w-5 shrink-0 text-green-700" />
          Глухонемые клинеры — абсолютная тишина и фокус
        </span>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="hero relative overflow-hidden bg-[#f1faf5]">
      {/* Single markup for all breakpoints: a plain CSS grid stacks Copy
       * above Image on mobile (no columns defined = one implicit column),
       * and lays them out side by side once `md:grid-cols-2` applies —
       * same DOM order works for both, so the image only renders once. */}
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 pb-10 pt-28 sm:px-6 md:min-h-[620px] md:grid-cols-2 md:gap-12 md:py-16 md:pt-16 lg:gap-16 lg:px-8 lg:py-20">
        <HeroCopy className="max-w-2xl md:max-w-xl" />
        <div className="flex items-end justify-center">
          <HeroImage />
        </div>
      </div>
    </section>
  );
}
