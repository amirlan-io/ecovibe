import { lazy, Suspense } from "react";
import { HeroSection } from "../components/landing/HeroSection";
import { ServicesSection } from "../components/landing/ServicesSection";
import { BenefitsSection } from "../components/landing/BenefitsSection";
import { MissionSection } from "../components/landing/MissionSection";
import { BookingCalculator } from "../components/BookingCalculator";

const BelowFoldSections = lazy(() =>
  import("./HomeBelowFold").then((m) => ({ default: m.HomeBelowFold })),
);

export function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <BenefitsSection />
      <MissionSection />

      <section
        id="calculator"
        className="scroll-mt-20 bg-gradient-to-br from-gray-50 to-green-50 section-mobile"
        data-calculator
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="landing-h2 mb-3 text-center font-bold">
            Рассчитайте точную стоимость уборки онлайн
          </h2>
          <p className="landing-body mx-auto mb-10 max-w-2xl text-center text-gray-600">
            Выберите тип уборки, площадь и дополнительные услуги — цена обновится мгновенно
          </p>
          <BookingCalculator />
        </div>
      </section>

      <Suspense fallback={null}>
        <BelowFoldSections />
      </Suspense>
    </>
  );
}
