import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

interface ReviewItem {
  image: string;
  author: string;
  text: string;
}

// Тексты — расшифровка реальных скриншотов переписки в WhatsApp (те же
// файлы, что показаны на картинке). Имена клиентов не публикуем без
// отдельного согласия, кроме случаев, где клиент сам представился в чате.
const REVIEWS: ReviewItem[] = [
  {
    image: "/images/reviews/review-1.webp",
    author: "Клиент EcoVibe",
    text: "Добрый вечер. Хотела сказать большое спасибо вашим сотрудницам. Очень тщательно убрали. И приятный аромат у ваших чистящих средств. Очень рада, что нашла вас 😊",
  },
  {
    image: "/images/reviews/review-2.webp",
    author: "Клиент EcoVibe",
    text: "Добрый вечер! Спасибо большое за отличную химчистку! Даже не ожидала, что диван станет таким чистым и свежим. Всё сделали быстро, аккуратно и без лишнего шума. Теперь буду обращаться только к вам!",
  },
  {
    image: "/images/reviews/review-3.webp",
    author: "Armel",
    text: "Все очень чисто, аккуратно, передайте ей мои благодарности.",
  },
  {
    image: "/images/reviews/review-4.webp",
    author: "Клиент EcoVibe",
    text: "Хочу поблагодарить ещё раз за проделанную работу! Я просто в шоке! Все убрано, вымыто, разложено!!! 🌺🌺",
  },
];

export function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let frame = 0;

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
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
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSlide = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const child = container.children[index] as HTMLElement | undefined;
    if (!child) return;

    requestAnimationFrame(() => {
      container.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
      setActiveSlide(index);
    });
  };

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    // Same @id as the LocalBusiness block in index.html <head> — this adds
    // review/rating properties to that entity instead of declaring a second,
    // ambiguous "duplicate" LocalBusiness on the page.
    "@id": "https://www.ecovibe.kz/#business",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: REVIEWS.length,
    },
    review: REVIEWS.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewBody: r.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    })),
  };

  return (
    <section
      id="reviews"
      className="section-mobile scroll-mt-20 bg-gradient-to-br from-green-50 to-emerald-50"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="landing-h2 mb-3 text-center font-bold">
          Отзывы наших клиентов
        </h2>
        <p className="landing-body mx-auto mb-10 max-w-2xl text-center text-gray-600">
          Реальные отзывы из WhatsApp от клиентов в Астане
        </p>

        {/* Единый горизонтальный carousel — одна и та же разметка для мобильных
            и десктопа, ширина карточки регулируется только CSS (snap-scroll) */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {REVIEWS.map((review, i) => (
            <article
              key={review.image}
              className="w-[85%] shrink-0 snap-start overflow-hidden rounded-xl bg-white shadow-md sm:w-[calc(50%-0.5rem)]"
            >
              <img
                src={review.image}
                srcSet={`${review.image.replace(".webp", "-340.webp")} 340w, ${review.image} 400w`}
                sizes="(min-width: 640px) 340px, 85vw"
                alt={`Скриншот отзыва от ${review.author} в WhatsApp`}
                width={400}
                height={600}
                className="h-auto w-full object-contain"
                loading="lazy"
              />
              <div className="p-4">
                <div className="mb-1 flex items-center gap-1" aria-hidden>
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star key={star} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700">{review.text}</p>
                <p className="mt-2 text-xs font-medium text-gray-500">— {review.author}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {REVIEWS.map((_, i) => (
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
    </section>
  );
}
