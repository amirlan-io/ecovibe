import { BeforeAfterSlider } from "./BeforeAfterSlider";

const GALLERY_ITEMS = [
  {
    title: "Кухня",
    before: "Кухня до уборки",
    after: "Кухня после уборки",
    beforeSrc: "https://placehold.co/600x400/4a3728/ffffff",
    afterSrc: "https://placehold.co/600x400/e8f5e9/2d7a3a",
  },
  {
    title: "Санузел",
    before: "Санузел до уборки",
    after: "Санузел после уборки",
    beforeSrc: "https://placehold.co/600x400/3d3d3d/ffffff",
    afterSrc: "https://placehold.co/600x400/e0f2fe/0369a1",
  },
  {
    title: "Комната",
    before: "Комната до уборки",
    after: "Комната после уборки",
    beforeSrc: "https://placehold.co/600x400/5c4033/ffffff",
    afterSrc: "https://placehold.co/600x400/f0fdf4/166534",
  },
];

export function WorkGallery() {
  return (
    <div className="mt-8">
      <div className="gallery-scroll pb-2">
        {GALLERY_ITEMS.map((item) => (
          <div key={item.title} className="gallery-slide max-w-[280px] sm:max-w-xs">
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
