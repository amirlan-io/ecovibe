import { Ear } from "lucide-react";
import { Link } from "react-router";

export function MissionSection() {
  return (
    <section className="section-mobile bg-white">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <Ear className="h-7 w-7 text-green-700" />
        </div>
        <h2 className="landing-h2 font-bold">
          Клининговые услуги в Астане с социальной миссией
        </h2>
        <p className="landing-body mt-4 text-gray-700">
          EcoVibe — клининговая компания в Астане, где работают глухонемые и слабослышащие
          клинеры. Мы принципиально трудоустраиваем людей с нарушением слуха, обучаем их
          профессиональной уборке и даём стабильную работу. Для вас это тишина, полная
          концентрация на задаче и результат без компромиссов.
        </p>
        <Link
          to="/o-nas"
          className="mt-6 inline-block font-semibold text-green-700 underline underline-offset-4 hover:text-green-600"
        >
          Узнать больше о нашей команде →
        </Link>
      </div>
    </section>
  );
}
