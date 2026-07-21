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

function HeroCopy({
  className,
  headingTag: Heading = "h1",
}: {
  className?: string;
  /** Only one visual copy of the hero should be an <h1> — the responsive
   * duplicate (hidden via CSS at the other breakpoint) must not be, or the
   * page ends up with two H1s in the static/prerendered markup. */
  headingTag?: "h1" | "p";
}) {
  const headingA11yProps =
    Heading === "p" ? { role: "heading" as const, "aria-level": 1 } : {};

  return (
    <div className={className}>
      <Heading
        className="landing-h1 font-bold text-gray-900 md:text-4xl md:leading-tight lg:text-5xl xl:text-[3.25rem]"
        {...headingA11yProps}
      >
        Профессиональный эко-клининг в Астане
      </Heading>
      <p className="mt-2 text-2xl font-bold text-green-700 md:mt-4 md:text-3xl lg:text-4xl">
        от 15 000 ₸
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
      {/* Mobile */}
      <div className="flex flex-col gap-8 px-4 pb-10 pt-28 sm:px-6 md:hidden">
        <HeroCopy className="max-w-2xl" headingTag="h1" />
        <HeroImage />
      </div>

      {/* Desktop */}
      <div className="hero-desktop hidden min-h-[620px] md:flex md:items-center">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 items-center gap-12 px-6 py-16 lg:gap-16 lg:px-8 lg:py-20">
          <HeroCopy className="max-w-xl" headingTag="p" />
          <div className="flex items-end justify-center">
            <HeroImage />
          </div>
        </div>
      </div>
    </section>
  );
}
