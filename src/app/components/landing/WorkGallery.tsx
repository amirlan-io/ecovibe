import { BeforeAfterSlider } from "./BeforeAfterSlider";

const GALLERY_ITEMS = [
  { title: "Кухня", before: "Жир и налёт", after: "Сияющая чистота" },
  { title: "Санузел", before: "Известковый налёт", after: "Блестящая сантехника" },
  { title: "Комната", before: "Пыль и разводы", after: "Свежий воздух и порядок" },
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
