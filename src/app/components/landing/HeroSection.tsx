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

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      <OptimizedPicture
        avifSrc={HERO.avif}
        webpSrc={HERO.webp}
        fallbackSrc={HERO.jpg}
        alt="Клининг Астана EcoVibe — профессиональная уборка"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
        width={1600}
        height={900}
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
          <div className="mt-8 flex flex-col gap-3 max-[479px]:w-full min-[480px]:flex-row min-[480px]:flex-wrap">
            <CalculatorLink className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-green-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-green-500 hover:shadow-xl min-[480px]:w-auto">
              Оставить заявку
            </CalculatorLink>
            <AnchorLink
              sectionId={SECTIONS.prices}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border-2 border-white/80 bg-white/10 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 min-[480px]:w-auto"
            >
              Узнать цены
            </AnchorLink>
          </div>
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
