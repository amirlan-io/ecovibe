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
    <section className="hero relative overflow-hidden">
      {/* Mobile — full-width photo background */}
      <div className="relative flex min-h-[85vh] items-center md:hidden">
        <OptimizedPicture
          pictureClassName="hero-bg-picture"
          avifSrc={HERO.avif}
          webpSrc={HERO.webp}
          fallbackSrc={HERO.jpg}
          alt="Профессиональный клининг EcoVibe в Астане"
          className="hero-bg-img"
          loading="eager"
          fetchPriority="high"
          width={1600}
          height={900}
          sizes="100vw"
          webpSrcSet="/images/hero.webp 400w, /images/hero.webp 800w, /images/hero.webp 1600w"
          avifSrcSet="/images/hero.avif 400w, /images/hero.avif 800w, /images/hero.avif 1600w"
          fallbackSrcSet="/images/hero.jpg 400w, /images/hero.jpg 800w, /images/hero.jpg 1600w"
        />
        <div className="hero-overlay" aria-hidden />
        <div className="hero-content mx-auto w-full max-w-7xl px-4 py-28 sm:px-6">
          <div className="max-w-2xl">
            <h1 className="landing-h1 font-bold text-white">
              Профессиональный эко-клининг в Астане
            </h1>
            <p className="mt-2 text-2xl font-bold text-green-400">от 15 000 ₸</p>
            <p className="landing-lead mt-5 text-white/90">
              Используем гипоаллергенные средства, безопасные для детей и питомцев.
            </p>
            <div className="mt-8 flex flex-col gap-3 max-[479px]:w-full min-[480px]:flex-row min-[480px]:flex-wrap">
              <CalculatorLink className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-green-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-500 min-[480px]:w-auto">
                Оставить заявку
              </CalculatorLink>
              <AnchorLink
                sectionId={SECTIONS.prices}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border-2 border-white/80 bg-white/10 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 min-[480px]:w-auto"
              >
                Узнать цены
              </AnchorLink>
            </div>
            <div className="landing-body mt-8 flex flex-wrap gap-5 text-white/85">
              <span className="flex items-center gap-2">
                <Check className="h-5 w-5 shrink-0 text-green-400" />
                500+ клиентов
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-5 w-5 shrink-0 text-green-400" />
                100% эко-средства
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop — two columns, dark background */}
      <div className="hero-desktop hidden min-h-[calc(100vh-4rem)] bg-[#1a1a1a] md:flex md:items-center">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 items-center gap-12 px-6 py-16 lg:gap-16 lg:px-8 lg:py-20">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold leading-tight text-white lg:text-5xl xl:text-[3.25rem]">
              Профессиональный эко-клининг в Астане
            </h1>
            <p className="mt-4 text-3xl font-bold text-green-500 lg:text-4xl">от 15 000 ₸</p>
            <p className="mt-6 text-lg leading-relaxed text-gray-300">
              Используем гипоаллергенные средства, безопасные для детей и питомцев.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <CalculatorLink className="inline-flex min-h-12 items-center justify-center rounded-xl bg-green-600 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-green-500">
                Оставить заявку
              </CalculatorLink>
              <AnchorLink
                sectionId={SECTIONS.prices}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-green-600 px-8 py-3.5 text-base font-semibold text-green-500 transition-colors hover:bg-green-600/10"
              >
                Узнать цены
              </AnchorLink>
            </div>
            <div className="mt-10 flex flex-wrap gap-8 text-gray-300">
              <span className="flex items-center gap-2.5">
                <Check className="h-5 w-5 shrink-0 text-green-500" />
                500+ клиентов
              </span>
              <span className="flex items-center gap-2.5">
                <Check className="h-5 w-5 shrink-0 text-green-500" />
                100% эко-средства
              </span>
            </div>
          </div>

          <div className="flex items-end justify-center">
            <div className="hero-image-arch relative w-full max-w-md lg:max-w-lg">
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
                sizes="(min-width: 768px) 50vw, 0px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
