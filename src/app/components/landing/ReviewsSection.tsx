import { useEffect, useRef, useState } from "react";

const WHATSAPP_REVIEWS = [
  "/images/reviews/review-1.webp",
  "/images/reviews/review-2.webp",
  "/images/reviews/review-3.webp",
  "/images/reviews/review-4.webp",
];

export function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const center = container.scrollLeft + container.clientWidth / 2;
      let bestIndex = 0;
      let bestDistance = Infinity;

      Array.from(container.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const childCenter = el.offsetLeft + el.offsetWidth / 2;
        const distance = Math.abs(center - childCenter);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = i;
        }
      });

      setActiveSlide(bestIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSlide = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const child = container.children[index] as HTMLElement | undefined;
    if (!child) return;
    container.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
    setActiveSlide(index);
  };

  return (
    <section id="reviews" className="section-mobile scroll-mt-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="landing-h2 mb-3 text-center font-bold">
          Отзывы наших клиентов
        </h2>
        <p className="landing-body mx-auto mb-10 max-w-2xl text-center text-gray-600">
          Реальные отзывы из WhatsApp от клиентов в Астане
        </p>

        {/* Mobile carousel */}
        <div className="sm:hidden">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {WHATSAPP_REVIEWS.map((src, i) => (
              <div key={src} className="min-w-full w-full shrink-0 snap-start">
                <img
                  src={src}
                  alt={`Отзыв клиента EcoVibe ${i + 1}`}
                  width={400}
                  height={600}
                  className="h-auto w-full rounded-xl object-contain shadow-md"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {WHATSAPP_REVIEWS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToSlide(i)}
                aria-label={`Отзыв ${i + 1}`}
                aria-current={activeSlide === i ? "true" : undefined}
                className="flex items-center justify-center p-2"
              >
                <span
                  className={`h-3 w-3 rounded-full transition-colors ${
                    activeSlide === i ? "bg-green-600" : "bg-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden grid-cols-2 gap-3 sm:grid sm:gap-4">
          {WHATSAPP_REVIEWS.map((src, i) => (
            <div key={src}>
              <img
                src={src}
                alt={`Отзыв клиента EcoVibe ${i + 1}`}
                width={400}
                height={600}
                className="h-auto w-full rounded-xl object-contain shadow-md"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
