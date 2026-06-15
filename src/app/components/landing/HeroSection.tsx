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
    <section className="hero relative flex min-h-[85vh] items-center overflow-hidden">
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

      <div className="hero-content mx-auto w-full max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="landing-h1 font-bold text-white">
            Профессиональный эко-клининг в Астане от 15 000 ₸
          </h1>
          <p className="landing-lead mt-5 text-white/90">
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
          <div className="mt-8 flex flex-wrap gap-5 landing-body text-white/85">
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
