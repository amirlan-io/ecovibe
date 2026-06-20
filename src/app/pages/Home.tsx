import { lazy, Suspense } from "react";
import { HeroSection } from "../components/landing/HeroSection";

const ServicesSection = lazy(() =>
  import("../components/landing/ServicesSection").then((m) => ({ default: m.ServicesSection })),
);
const BenefitsSection = lazy(() =>
  import("../components/landing/BenefitsSection").then((m) => ({ default: m.BenefitsSection })),
);
const ProcessSection = lazy(() =>
  import("../components/landing/ProcessSection").then((m) => ({ default: m.ProcessSection })),
);
const PricesSection = lazy(() =>
  import("../components/landing/PricesSection").then((m) => ({ default: m.PricesSection })),
);
const ReviewsSection = lazy(() =>
  import("../components/landing/ReviewsSection").then((m) => ({ default: m.ReviewsSection })),
);
const BeforeAfterSection = lazy(() =>
  import("../components/landing/BeforeAfterSection").then((m) => ({ default: m.BeforeAfterSection })),
);
const FAQ = lazy(() => import("../components/FAQ").then((m) => ({ default: m.FAQ })));
const BookingCalculator = lazy(() =>
  import("../components/BookingCalculator").then((m) => ({ default: m.BookingCalculator })),
);

const sectionFallback = (
  <div className="h-96 animate-pulse rounded-xl bg-gray-100" />
);

export function Home() {
  return (
    <>
      <HeroSection />

      <Suspense fallback={sectionFallback}>
        <ServicesSection />
      </Suspense>

      <Suspense fallback={sectionFallback}>
        <BenefitsSection />
      </Suspense>

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
          <Suspense fallback={sectionFallback}>
            <BookingCalculator />
          </Suspense>
        </div>
      </section>

      <Suspense fallback={sectionFallback}>
        <ProcessSection />
      </Suspense>

      <Suspense fallback={sectionFallback}>
        <PricesSection />
      </Suspense>

      <Suspense fallback={sectionFallback}>
        <BeforeAfterSection />
      </Suspense>

      <Suspense fallback={sectionFallback}>
        <ReviewsSection />
      </Suspense>

      <Suspense fallback={sectionFallback}>
        <FAQ />
      </Suspense>
    </>
  );
}
