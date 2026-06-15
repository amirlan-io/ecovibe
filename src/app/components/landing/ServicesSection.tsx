import { useState } from "react";
import {
  Bath,
  BedDouble,
  ChefHat,
  Sparkles,
  SprayCan,
  Wind,
} from "lucide-react";
import { cn } from "../ui/utils";

type ServiceTab = "maintain" | "general" | "renovation";

const TABS: { id: ServiceTab; label: string }[] = [
  { id: "maintain", label: "Поддерживающая" },
  { id: "general", label: "Генеральная" },
  { id: "renovation", label: "После ремонта" },
];

const SERVICE_DETAILS: Record<
  ServiceTab,
  { zone: string; icon: typeof BedDouble; items: string[] }[]
> = {
  maintain: [
    {
      zone: "В комнатах",
      icon: BedDouble,
      items: ["Сухая и влажная уборка полов", "Протирка пыли и зеркал", "Складывание вещей на видных поверхностях"],
    },
    {
      zone: "На кухне",
      icon: ChefHat,
      items: ["Мойка раковины и столешницы", "Протирка фасадов", "Чистка плиты снаружи"],
    },
    {
      zone: "В санузле",
      icon: Bath,
      items: ["Дезинфекция поверхностей", "Мойка кафеля и сантехники", "Чистка зеркал и полок"],
    },
  ],
  general: [
    {
      zone: "В комнатах",
      icon: BedDouble,
      items: ["Глубокая уборка полов", "Протирка плинтусов и дверей", "Мойка зеркал и стеклянных поверхностей"],
    },
    {
      zone: "На кухне",
      icon: ChefHat,
      items: ["Чистка плиты и вытяжки", "Мойка фасадов и раковины", "Дегазация рабочих зон"],
    },
    {
      zone: "В санузле",
      icon: Bath,
      items: ["Удаление известкового налёта", "Дезинфекция унитаза и душа", "Полировка кафеля и хрома"],
    },
  ],
  renovation: [
    {
      zone: "В комнатах",
      icon: Wind,
      items: ["Удаление строительной пыли", "Мойка окон и подоконников", "Влажная уборка всех поверхностей"],
    },
    {
      zone: "На кухне",
      icon: SprayCan,
      items: ["Уборка после ремонта техники", "Чистка шкафов внутри и снаружи", "Мойка плиты и раковины"],
    },
    {
      zone: "В санузле",
      icon: Sparkles,
      items: ["Удаление следов стройматериалов", "Глубокая дезинфекция", "Финальная полировка сантехники"],
    },
  ],
};

export function ServicesSection() {
  const [active, setActive] = useState<ServiceTab>("maintain");
  const zones = SERVICE_DETAILS[active];

  return (
    <section id="services" className="scroll-mt-20 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          Что мы делаем во время уборки
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
          Выберите тип уборки и посмотрите, что входит в каждую зону квартиры
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300",
                active === tab.id
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {zones.map((zone) => {
            const Icon = zone.icon;
            return (
              <article
                key={zone.zone}
                className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6 transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-4 text-lg font-semibold">{zone.zone}</h3>
                <ul className="space-y-2.5">
                  {zone.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-gray-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
