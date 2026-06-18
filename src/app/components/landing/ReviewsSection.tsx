import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

const REVIEWS = [
  {
    name: "Асель К.",
    source: "WhatsApp",
    time: "14:32",
    rating: 5,
    text: "Отличная команда! Квартира сияет. Особенно приятно, что используют безопасные средства 🌿",
    service: "Генеральная уборка",
  },
  {
    name: "Дмитрий М.",
    source: "2GIS",
    rating: 5,
    text: "Быстро, качественно, без лишних вопросов. Буду заказывать регулярно.",
    service: "Поддерживающая уборка",
  },
  {
    name: "Гульнара С.",
    source: "Instagram",
    rating: 5,
    text: "Очень довольна социальной миссией компании. Качество работы на высоте! Рекомендую 💚",
    service: "Генеральная уборка",
  },
  {
    name: "Ерлан Т.",
    source: "WhatsApp",
    time: "09:15",
    rating: 5,
    text: "Заказали уборку после ремонта — убрали всю пыль, окна блестят. Спасибо EcoVibe!",
    service: "После ремонта",
  },
];

export function ReviewsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="reviews" className="section-mobile scroll-mt-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="landing-h2 text-center font-bold">
          Результаты нашей работы
        </h2>
        <p className="landing-body mx-auto mt-3 max-w-2xl text-center text-gray-600">
          Сравните «до» и «после», а также отзывы наших клиентов
        </p>

        <div className="mx-auto mt-8 flex w-full max-w-xs justify-center sm:max-w-sm md:mt-10 md:max-w-md lg:max-w-lg">
          <BeforeAfterSlider
            beforeSrc="/images/before-bathroom.webp"
            afterSrc="/images/after-bathroom.webp"
            beforeLabel="До уборки"
            afterLabel="После уборки"
          />
        </div>

        <div className="relative mt-14">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {REVIEWS.map((review) => (
                <article
                  key={review.name + review.text.slice(0, 20)}
                  className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-0.5rem)] lg:flex-[0_0_calc(33.333%-0.67rem)]"
                >
                  {review.source === "WhatsApp" ? (
                    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                          {review.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                          <p className="text-xs text-gray-600">{review.time}</p>
                        </div>
                      </div>
                      <div className="mb-2 flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-sm text-yellow-400">
                            ★
                          </span>
                        ))}
                      </div>
                      <div className="rounded-lg rounded-tl-none bg-white px-3 py-2 text-sm text-gray-800 shadow-sm">
                        {review.text}
                      </div>
                      <p className="mt-2 text-xs text-gray-500">{review.service}</p>
                    </div>
                  ) : (
                    <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="font-semibold">{review.name}</p>
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                          {review.source}
                        </span>
                      </div>
                      <div className="mb-2 flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-sm text-yellow-400">
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed text-gray-700">{review.text}</p>
                      <p className="mt-3 text-xs text-gray-500">{review.service}</p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canPrev}
              aria-label="Предыдущий отзыв"
              className="btn-touch flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white transition-colors hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canNext}
              aria-label="Следующий отзыв"
              className="btn-touch flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white transition-colors hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-center text-lg font-semibold text-gray-800 mb-6">
            Реальные отзывы клиентов из WhatsApp
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              "/images/reviews/review-1.png",
              "/images/reviews/review-2.png",
              "/images/reviews/review-3.png",
              "/images/reviews/review-4.png",
            ].map((src, i) => (
              <div key={i} className="overflow-hidden rounded-2xl shadow-md">
                <img
                  src={src}
                  alt={`Отзыв клиента EcoVibe ${i + 1}`}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
