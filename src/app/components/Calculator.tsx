import { useState } from "react";
import { Check, MessageCircle } from "lucide-react";
import { formatPhoneNumber } from "../utils/phoneFormat";
import { PrivacyPolicyLink } from "./PrivacyPolicyLink";

type ServiceType = "wet" | "general" | "renovation" | "windows_only";

interface CalculatorState {
  service: ServiceType;
  area: number;
  windowCount: number;
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
  renovation: 850,
  windows_only: 3000,
};

const NAMES = {
  wet: "Влажная уборка",
  general: "Генеральная уборка",
  renovation: "Уборка после ремонта",
  windows_only: "Мойка окон",
};

const ROOM_PRESETS = [
  { label: "Студия", sublabel: "~25 м²", area: 25 },
  { label: "1 комн", sublabel: "~40 м²", area: 40 },
  { label: "2 комн", sublabel: "~60 м²", area: 60 },
  { label: "3 комн", sublabel: "~80 м²", area: 80 },
  { label: "4+ комн", sublabel: "~100 м²", area: 100 },
];

export function Calculator() {
  const [state, setState] = useState<CalculatorState>({
    service: "wet",
    area: 60,
    windowCount: 4,
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

  const toggleExtra = (key: keyof CalculatorState["extras"]) => {
    setState((prev) => ({
      ...prev,
      extras: { ...prev.extras, [key]: !prev.extras[key] },
    }));
  };

  const calculateTotal = () => {
    const rows: [string, number][] = [];
    let total = 0;

    if (state.service === "windows_only") {
      const sub = state.windowCount * 3000;
      rows.push([`Мойка окон (${state.windowCount} шт × 3 000 ₸)`, sub]);
      total += sub;
    } else {
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
    }

    const note =
      state.service === "windows_only" ||
      state.extras.sofa ||
      state.extras.mattress
        ? "Финальная цена уточняется при выезде мастера"
        : "Цена фиксированная, скрытых доплат нет";

    return { rows, total, note };
  };

  const { rows, total, note } = calculateTotal();
  const isWindowsOnly = state.service === "windows_only";

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
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-0">
        {/* Left Column - Calculator */}
        <div className="p-6 md:p-8 space-y-6 border-b md:border-b-0 md:border-r border-gray-200">
        {/* Step 1: Service Selection */}
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Шаг 1 — Выберите услугу
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(["wet", "general", "renovation", "windows_only"] as ServiceType[]).map(
              (service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => selectService(service)}
                  className={`p-3 rounded-lg border transition-all text-left ${
                    state.service === service
                      ? "border-2 border-green-700 bg-green-50"
                      : "border border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`text-sm font-medium mb-1 ${
                      state.service === service ? "text-green-900" : "text-gray-900"
                    }`}
                  >
                    {NAMES[service]}
                  </div>
                  <div
                    className={`text-xs ${
                      state.service === service ? "text-green-700" : "text-gray-500"
                    }`}
                  >
                    {service === "windows_only"
                      ? "3 000 ₸/окно"
                      : `${PRICES[service]} ₸/м²`}
                  </div>
                </button>
              )
            )}
          </div>
        </div>

        {/* Step 2: Area or Window Count */}
        {!isWindowsOnly ? (
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Шаг 2 — Площадь квартиры
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {ROOM_PRESETS.map((preset) => (
                <button
                  key={preset.area}
                  type="button"
                  onClick={() => selectRoom(preset.area)}
                  className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                    state.area === preset.area
                      ? "bg-green-50 border-green-700 text-green-900 font-medium"
                      : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div>{preset.label}</div>
                  <div className="text-xs opacity-70">{preset.sublabel}</div>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 whitespace-nowrap">
                Или укажите точно:
              </span>
              <input
                type="range"
                min="20"
                max="200"
                step="5"
                value={state.area}
                onChange={(e) => setArea(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="font-medium min-w-[58px] text-right">
                {state.area} м²
              </span>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Шаг 2 — Количество окон
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600">Окон в квартире:</label>
              <input
                type="number"
                min="1"
                max="30"
                value={state.windowCount}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    windowCount: parseInt(e.target.value) || 1,
                  }))
                }
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center"
              />
            </div>
          </div>
        )}

        {/* Step 3: Extras */}
        {!isWindowsOnly && (
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Шаг 3 — Дополнительно (необязательно)
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => toggleExtra("windows")}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  state.extras.windows
                    ? "bg-green-50 border-green-700"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  state.extras.windows
                    ? "bg-green-700 border-green-700 text-white"
                    : "border-gray-300"
                }`}
              >
                {state.extras.windows && <Check className="w-3 h-3" />}
              </div>
              <div className="flex-1 text-left">
                <div
                  className={`text-sm ${
                    state.extras.windows
                      ? "text-green-900 font-medium"
                      : "text-gray-900"
                  }`}
                >
                  Мойка окон
                </div>
                <div className="text-xs text-gray-500">3 000 ₸ / окно</div>
              </div>
              </button>

              <button
                type="button"
                onClick={() => toggleExtra("sofa")}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  state.extras.sofa
                    ? "bg-green-50 border-green-700"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  state.extras.sofa
                    ? "bg-green-700 border-green-700 text-white"
                    : "border-gray-300"
                }`}
              >
                {state.extras.sofa && <Check className="w-3 h-3" />}
              </div>
              <div className="flex-1 text-left">
                <div
                  className={`text-sm ${
                    state.extras.sofa ? "text-green-900 font-medium" : "text-gray-900"
                  }`}
                >
                  Химчистка дивана
                </div>
                <div className="text-xs text-gray-500">от 10 000 ₸</div>
              </div>
              </button>

              <button
                type="button"
                onClick={() => toggleExtra("chair")}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  state.extras.chair
                    ? "bg-green-50 border-green-700"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  state.extras.chair
                    ? "bg-green-700 border-green-700 text-white"
                    : "border-gray-300"
                }`}
              >
                {state.extras.chair && <Check className="w-3 h-3" />}
              </div>
              <div className="flex-1 text-left">
                <div
                  className={`text-sm ${
                    state.extras.chair
                      ? "text-green-900 font-medium"
                      : "text-gray-900"
                  }`}
                >
                  Химчистка стула
                </div>
                <div className="text-xs text-gray-500">1 000 ₸ / шт</div>
              </div>
              </button>

              <button
                type="button"
                onClick={() => toggleExtra("mattress")}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  state.extras.mattress
                    ? "bg-green-50 border-green-700"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  state.extras.mattress
                    ? "bg-green-700 border-green-700 text-white"
                    : "border-gray-300"
                }`}
              >
                {state.extras.mattress && <Check className="w-3 h-3" />}
              </div>
              <div className="flex-1 text-left">
                <div
                  className={`text-sm ${
                    state.extras.mattress
                      ? "text-green-900 font-medium"
                      : "text-gray-900"
                  }`}
                >
                  Химчистка матраса
                </div>
                <div className="text-xs text-gray-500">от 10 000 ₸</div>
              </div>
              </button>
            </div>

            {/* Extra options inputs */}
            {state.extras.windows && (
              <div className="flex items-center gap-3 mt-3 p-3 bg-green-50 rounded-lg">
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
              <div className="flex items-center gap-3 mt-3 p-3 bg-green-50 rounded-lg">
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
        )}

          {/* Price Summary */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <div className="space-y-2 mb-4">
              {rows.map(([name, value], index) => (
                <div
                  key={index}
                  className="flex justify-between items-baseline pb-2 border-b border-green-200 last:border-0"
                >
                  <span className="text-sm text-green-700">{name}</span>
                  <span className="text-sm font-medium text-green-900">
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
            <div className="text-xs text-green-700 mt-3">{note}</div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="p-6 md:p-8 bg-gray-50">
          <h3 className="mb-6 text-center md:text-left">Оформить заявку</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="calc-name" className="block text-sm font-medium mb-2">
                Ваше имя *
              </label>
              <input
                type="text"
                id="calc-name"
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
              <label htmlFor="calc-phone" className="block text-sm font-medium mb-2">
                Телефон *
              </label>
              <input
                type="tel"
                id="calc-phone"
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
              <label htmlFor="calc-address" className="block text-sm font-medium mb-2">
                Адрес *
              </label>
              <input
                type="text"
                id="calc-address"
                required
                value={state.address}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, address: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                placeholder="Улица, дом, квартира"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Отправить заявку в WhatsApp
            </button>

            <p className="text-center text-xs text-gray-500">
              Нажимая кнопку, вы соглашаетесь с{" "}
              <PrivacyPolicyLink className="text-green-600 hover:text-green-700">
                политикой конфиденциальности
              </PrivacyPolicyLink>
            </p>

            <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
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
