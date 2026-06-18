const WHATSAPP_REVIEWS = [
  "/images/reviews/review-1.png",
  "/images/reviews/review-2.png",
  "/images/reviews/review-3.png",
  "/images/reviews/review-4.png",
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="section-mobile scroll-mt-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="landing-h2 mb-3 text-center font-bold">
          Отзывы наших клиентов
        </h2>
        <p className="landing-body mx-auto mb-10 max-w-2xl text-center text-gray-600">
          Реальные отзывы из WhatsApp от клиентов в Астане
        </p>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {WHATSAPP_REVIEWS.map((src, i) => (
            <div 
              key={src} 
              className="overflow-hidden rounded-xl shadow-md"
            >
              <img
                src={src}
                alt={`Отзыв клиента EcoVibe ${i + 1}`}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
