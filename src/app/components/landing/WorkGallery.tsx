import { BeforeAfterSlider } from "./BeforeAfterSlider";

const GALLERY_ITEMS = [
  {
    title: "Кухня",
    before: "Кухня до уборки",
    after: "Кухня после уборки",
    beforeSrc: "https://placehold.co/800x600/4a3728/ffffff?text=Кухня+до",
    afterSrc: "https://placehold.co/800x600/e8f5e9/2d7a3a?text=Кухня+после",
  },
  {
    title: "Санузел",
    before: "Санузел до уборки",
    after: "Санузел после уборки",
    beforeSrc: "https://placehold.co/800x600/3d3d3d/ffffff?text=Санузел+до",
    afterSrc: "https://placehold.co/800x600/e0f2fe/0369a1?text=Санузел+после",
  },
  {
    title: "Комната",
    before: "Комната до уборки",
    after: "Комната после уборки",
    beforeSrc: "https://placehold.co/800x600/5c4033/ffffff?text=Комната+до",
    afterSrc: "https://placehold.co/800x600/f0fdf4/166534?text=Комната+после",
  },
];

export function WorkGallery() {
  return (
    <div className="mt-12 -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="gallery-scroll pb-2">
        {GALLERY_ITEMS.map((item) => (
          <div key={item.title} className="gallery-slide">
            <p className="mb-2 text-center text-sm font-medium text-gray-600">{item.title}</p>
            <BeforeAfterSlider
              beforeLabel={item.before}
              afterLabel={item.after}
              beforeSrc={item.beforeSrc}
              afterSrc={item.afterSrc}
            />
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-gray-500 md:hidden">
        Свайпните влево, чтобы увидеть ещё примеры
      </p>
    </div>
  );
}
