import { BeforeAfterSection } from "../components/landing/BeforeAfterSection";
import { FAQ } from "../components/FAQ";
import { PricesSection } from "../components/landing/PricesSection";
import { ProcessSection } from "../components/landing/ProcessSection";
import { ReviewsSection } from "../components/landing/ReviewsSection";

export function HomeBelowFold() {
  return (
    <>
      <ProcessSection />
      <PricesSection />
      <BeforeAfterSection />
      <ReviewsSection />
      <FAQ />
    </>
  );
}
