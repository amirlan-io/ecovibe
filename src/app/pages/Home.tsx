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

export function Home() {
  return (
    <>
      <HeroSection />

      <Suspense fallback={null}>
        <ServicesSection />
      </Suspense>

      <Suspense fallback={null}>
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
          <div className="min-h-[720px]">
            <Suspense fallback={null}>
              <BookingCalculator />
            </Suspense>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <ProcessSection />
      </Suspense>

      <Suspense fallback={null}>
        <PricesSection />
      </Suspense>

      <Suspense fallback={null}>
        <BeforeAfterSection />
      </Suspense>

      <Suspense fallback={null}>
        <ReviewsSection />
      </Suspense>

      <Suspense fallback={null}>
        <FAQ />
      </Suspense>
    </>
  );
}
