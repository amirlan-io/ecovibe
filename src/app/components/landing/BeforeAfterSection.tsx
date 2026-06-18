import { BeforeAfterSlider } from "./BeforeAfterSlider";

export function BeforeAfterSection() {
  return (
    <section className="section-mobile scroll-mt-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="landing-h2 text-center font-bold">Результаты нашей работы</h2>
        <p className="landing-body mx-auto mt-3 max-w-2xl text-center text-gray-600">
          Сравните «до» и «после» уборки
        </p>

        <div className="mx-auto mt-8 flex w-full max-w-xs justify-center sm:max-w-sm md:mt-10 md:max-w-md lg:max-w-lg">
          <BeforeAfterSlider
            beforeSrc="/images/before-bathroom.webp"
            afterSrc="/images/after-bathroom.webp"
            beforeLabel="До уборки"
            afterLabel="После уборки"
          />
        </div>
      </div>
    </section>
  );
}
