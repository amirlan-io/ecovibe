import { AnchorLink } from "../AnchorLink";
import { CalculatorLink } from "../CalculatorLink";
import { OptimizedPicture } from "../OptimizedPicture";
import { SECTIONS } from "../../utils/sections";
import { Check } from "lucide-react";

const HERO = {
  avif: "/images/hero.avif",
  webp: "/images/hero.webp",
  jpg: "/images/hero.jpg",
};

function HeroImage() {
  return (
    <div className="hero-image-arch relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
      <OptimizedPicture
        avifSrc={HERO.avif}
        webpSrc={HERO.webp}
        fallbackSrc={HERO.jpg}
        alt="Клинер EcoVibe — профессиональная уборка в Астане"
        className="h-full w-full object-cover object-top"
        loading="eager"
        fetchPriority="high"
        width={600}
        height={800}
        sizes="(min-width: 768px) 50vw, 80vw"
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
        от 15 000 ₸
      </p>
      <p className="landing-lead mt-5 text-gray-700 md:mt-6 md:text-lg">
        Используем гипоаллергенные средства, безопасные для детей и питомцев.
      </p>
      <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap md:mt-10">
        <CalculatorLink className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-green-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-green-500 min-[480px]:w-auto md:py-3.5">
          Оставить заявку
        </CalculatorLink>
        <AnchorLink
          sectionId={SECTIONS.prices}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border-2 border-green-700 px-8 py-3 text-base font-semibold text-green-800 transition-colors hover:bg-green-700/10 min-[480px]:w-auto md:py-3.5"
        >
          Узнать цены
        </AnchorLink>
      </div>
      <div className="landing-body mt-8 flex flex-wrap gap-5 text-gray-700 md:mt-10 md:gap-8">
        <span className="flex items-center gap-2">
          <Check className="h-5 w-5 shrink-0 text-green-700" />
          500+ клиентов
        </span>
        <span className="flex items-center gap-2">
          <Check className="h-5 w-5 shrink-0 text-green-700" />
          100% эко-средства
        </span>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="hero relative overflow-hidden bg-[#CCFBCC]">
      {/* Mobile */}
      <div className="flex flex-col gap-8 px-4 pb-10 pt-28 sm:px-6 md:hidden">
        <HeroCopy className="max-w-2xl" />
        <HeroImage />
      </div>

      {/* Desktop */}
      <div className="hero-desktop hidden min-h-[calc(100vh-4rem)] md:flex md:items-center">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 items-center gap-12 px-6 py-16 lg:gap-16 lg:px-8 lg:py-20">
          <HeroCopy className="max-w-xl" />
          <div className="flex items-end justify-center">
            <HeroImage />
          </div>
        </div>
      </div>
    </section>
  );
}
