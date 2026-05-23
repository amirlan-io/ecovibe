import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { formatPhoneNumber } from "../utils/phoneFormat";
import { Checkbox } from "./ui/checkbox";
import { cn } from "./ui/utils";
import { PrivacyPolicyLink } from "./PrivacyPolicyLink";

type ServiceType = "wet" | "general";

interface BookingState {
  service: ServiceType;
  area: number;
  extras: {
    windows: boolean;
    sofa: boolean;
    chair: boolean;
    mattress: boolean;
  };
  extraWindowCount: number;
  chairCount: number;
  name: string;
  phone: string;
  address: string;
}

const PRICES = {
  wet: 550,
  general: 650,
};

const NAMES = {
  wet: "Влажная уборка",
  general: "Генеральная уборка",
};

const ROOM_PRESETS = [
  { label: "Студия", sublabel: "~25 м²", area: 25 },
  { label: "1 комн", sublabel: "~40 м²", area: 40 },
  { label: "2 комн", sublabel: "~60 м²", area: 60 },
  { label: "3 комн", sublabel: "~80 м²", area: 80 },
  { label: "4+ комн", sublabel: "~100 м²", area: 100 },
];

const EXTRA_OPTIONS: {
  key: keyof BookingState["extras"];
  title: string;
  price: string;
}[] = [
  { key: "windows", title: "Мойка окон", price: "3 000 ₸ / окно" },
  { key: "sofa", title: "Химчистка дивана", price: "от 10 000 ₸" },
  { key: "chair", title: "Химчистка стульев", price: "1 000 ₸ / шт" },
  { key: "mattress", title: "Химчистка матраса", price: "от 10 000 ₸" },
];

export function BookingCalculator() {
  const [state, setState] = useState<BookingState>({
    service: "wet",
    area: 60,
    extras: {
      windows: false,
      sofa: false,
      chair: false,
      mattress: false,
    },
    extraWindowCount: 3,
    chairCount: 2,
    name: "",
    phone: "",
    address: "",
  });

  const selectService = (service: ServiceType) => {
    setState((prev) => ({ ...prev, service }));
  };

  const selectRoom = (area: number) => {
    setState((prev) => ({ ...prev, area }));
  };

  const setArea = (area: number) => {
    setState((prev) => ({ ...prev, area }));
  };

  const calculateTotal = () => {
    const rows: [string, number][] = [];
    let total = 0;

    const rate = PRICES[state.service];
    const base = state.area * rate;
    rows.push([`${NAMES[state.service]} (${state.area} м² × ${rate} ₸)`, base]);
    total += base;

    if (state.extras.windows) {
      const sub = state.extraWindowCount * 3000;
      rows.push([`Мойка окон (${state.extraWindowCount} шт × 3 000 ₸)`, sub]);
      total += sub;
    }
    if (state.extras.sofa) {
      rows.push(["Химчистка дивана", 10000]);
      total += 10000;
    }
    if (state.extras.chair) {
      const sub = state.chairCount * 1000;
      rows.push([`Химчистка стульев (${state.chairCount} шт × 1 000 ₸)`, sub]);
      total += sub;
    }
    if (state.extras.mattress) {
      rows.push(["Химчистка матраса", 10000]);
      total += 10000;
    }

    return { rows, total };
  };

  const { rows, total } = calculateTotal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Формируем сообщение для WhatsApp
    let message = `🏠 *Новая заявка на уборку*\n\n`;
    message += `👤 *Имя:* ${state.name}\n`;
    message += `📞 *Телефон:* ${state.phone}\n`;
    message += `📍 *Адрес:* ${state.address}\n\n`;
    message += `📋 *Детали заказа:*\n`;

    rows.forEach(([name, price]) => {
      message += `• ${name}: ${Math.round(price).toLocaleString("ru-RU")} ₸\n`;
    });

    message += `\n💰 *Итого: ${Math.round(total).toLocaleString("ru-RU")} ₸*`;

    // Кодируем сообщение для URL
    const encodedMessage = encodeURIComponent(message);

    // Открываем WhatsApp с сообщением
    window.open(`https://wa.me/77073204199?text=${encodedMessage}`, "_blank");

    // Очищаем форму
    setState((prev) => ({
      ...prev,
      name: "",
      phone: "",
      address: "",
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <h2 className="px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8 pb-4 text-center text-lg sm:text-xl md:text-2xl border-b border-gray-200">
        Рассчитайте стоимость уборки
      </h2>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-0">
        {/* Left Column - Calculator */}
        <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 border-b md:border-b-0 md:border-r border-gray-200">
        {/* Step 1: Service Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Выберите услугу
          </label>
          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3">
            {(["wet", "general"] as ServiceType[]).map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => selectService(service)}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all text-left ${
                  state.service === service
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200 bg-white hover:border-green-300"
                }`}
              >
                <div
                  className={`font-medium mb-1 ${
                    state.service === service ? "text-green-900" : "text-gray-900"
                  }`}
                >
                  {NAMES[service]}
                </div>
                <div
                  className={`text-sm ${
                    state.service === service ? "text-green-700" : "text-gray-500"
                  }`}
                >
                  {PRICES[service]} ₸/м²
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Area Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Площадь квартиры
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
            {ROOM_PRESETS.map((preset) => (
              <button
                key={preset.area}
                type="button"
                onClick={() => selectRoom(preset.area)}
                className={`p-2 rounded-lg border transition-all text-center ${
                  state.area === preset.area
                    ? "bg-green-50 border-green-600 text-green-900 font-medium"
                    : "bg-white border-gray-200 text-gray-600 hover:border-green-300"
                }`}
              >
                <div className="text-sm">{preset.label}</div>
                <div className="text-xs opacity-70">{preset.sublabel}</div>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-sm text-gray-600 shrink-0">
              Точная площадь:
            </span>
            <input
              type="range"
              min="20"
              max="200"
              step="5"
              value={state.area}
              onChange={(e) => setArea(parseInt(e.target.value))}
              className="w-full min-w-0 flex-1 h-2 cursor-pointer accent-green-600"
            />
            <span className="font-medium shrink-0 text-green-600 sm:min-w-[58px] sm:text-right">
              {state.area} м²
            </span>
          </div>
        </div>

        {/* Step 3: Extras */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Дополнительно (необязательно)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {EXTRA_OPTIONS.map((option) => {
              const checked = state.extras[option.key];
              return (
                <label
                  key={option.key}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer",
                    checked
                      ? "bg-green-50 border-green-600"
                      : "bg-white border-gray-200 hover:border-green-300",
                  )}
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(value) =>
                      setState((prev) => ({
                        ...prev,
                        extras: {
                          ...prev.extras,
                          [option.key]: value === true,
                        },
                      }))
                    }
                    className="size-5 shrink-0 border-green-300 bg-white data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 data-[state=checked]:text-white"
                  />
                  <div className="flex-1 text-left min-w-0">
                    <div
                      className={cn(
                        "text-sm",
                        checked ? "text-green-900 font-medium" : "text-gray-900",
                      )}
                    >
                      {option.title}
                    </div>
                    <div className="text-xs text-gray-500">{option.price}</div>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Extra options inputs */}
          {state.extras.windows && (
            <div className="flex flex-wrap items-center gap-3 mt-3 p-3 bg-green-50 rounded-lg">
              <label className="text-sm text-gray-700">Количество окон:</label>
              <input
                type="number"
                min="1"
                max="30"
                value={state.extraWindowCount}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    extraWindowCount: parseInt(e.target.value) || 1,
                  }))
                }
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center"
              />
            </div>
          )}
          {state.extras.chair && (
            <div className="flex flex-wrap items-center gap-3 mt-3 p-3 bg-green-50 rounded-lg">
              <label className="text-sm text-gray-700">Количество стульев:</label>
              <input
                type="number"
                min="1"
                max="20"
                value={state.chairCount}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    chairCount: parseInt(e.target.value) || 1,
                  }))
                }
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center"
              />
            </div>
          )}
        </div>

          {/* Price Summary */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <div className="space-y-2 mb-4">
              {rows.map(([name, value], index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-baseline pb-2 border-b border-green-200 last:border-0"
                >
                  <span className="text-sm text-green-700 break-words">{name}</span>
                  <span className="text-sm font-medium text-green-900 shrink-0 sm:text-right">
                    {Math.round(value).toLocaleString("ru-RU")} ₸
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-baseline pt-3 border-t-2 border-green-300">
              <span className="text-base font-medium text-green-900">Итого</span>
              <span className="text-2xl font-bold text-green-950">
                {Math.round(total).toLocaleString("ru-RU")} ₸
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="relative z-0 p-4 sm:p-6 md:p-8 bg-gray-50 max-md:pb-8">
          <h3 className="mb-5 sm:mb-6 text-center md:text-left text-lg sm:text-xl">Оформить заявку</h3>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Ваше имя *
              </label>
              <input
                type="text"
                id="name"
                required
                value={state.name}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                placeholder="Как вас зовут?"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Телефон *
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={state.phone}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, phone: formatPhoneNumber(e.target.value) }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                placeholder="+7 7__ ___ __ __"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-2">
                Адрес *
              </label>
              <input
                type="text"
                id="address"
                required
                value={state.address}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, address: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                placeholder="Улица, дом, квартира"
              />
            </div>

            <div className="mt-2 space-y-3 max-md:pb-2">
              <button
                type="submit"
                className="relative z-0 w-full py-3.5 sm:py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base px-3"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                <span className="text-center">Отправить заявку в WhatsApp</span>
              </button>

              <p className="text-center text-xs text-gray-500">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <PrivacyPolicyLink className="text-green-600 hover:text-green-700">
                  политикой конфиденциальности
                </PrivacyPolicyLink>
              </p>
            </div>

            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                ⚡ Ответим в течение 15 минут
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
