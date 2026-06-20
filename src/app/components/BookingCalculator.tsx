import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import {
  formatPhoneNumber,
  isPhoneComplete,
  phoneForSubmit,
} from "../utils/phoneFormat";
import {
  formatClientPhoneForSheets,
  submitBookingToMakeBackup,
} from "../utils/makeWebhook";
import { buildCRMPayload, submitLeadToQazCrm } from "../utils/qazcrm";
import { Checkbox } from "./ui/checkbox";
import { cn } from "./ui/utils";
import { PrivacyPolicyLink } from "./PrivacyPolicyLink";

type ServiceType = "wet" | "general" | "renovation";

interface BookingState {
  service: ServiceType;
  area: number;
  rooms: number;
  bathrooms: number;
  extras: {
    windows: boolean;
    sofa: boolean;
    balcony: boolean;
  };
  extraWindowCount: number;
  chairCount: number;
  name: string;
  phone: string;
  address: string;
  date: string;
  time: string;
}

const WINDOW_PRICE = 4000;

const PRICES = {
  wet: 550,
  general: 650,
  renovation: 850,
};

const NAMES = {
  wet: "Поддерживающая",
  general: "Генеральная",
  renovation: "После ремонта",
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
  { key: "windows", title: "Мойка окон", price: "4 000 ₸ / окно" },
  { key: "sofa", title: "Химчистка дивана", price: "от 10 000 ₸" },
  { key: "balcony", title: "Уборка балкона", price: "5 000 ₸" },
];

function buildSelectedExtrasLabels(state: BookingState): string[] {
  return EXTRA_OPTIONS.filter((opt) => state.extras[opt.key]).map(
    (opt) => opt.title,
  );
}

export function BookingCalculator() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [state, setState] = useState<BookingState>({
    service: "wet",
    area: 60,
    rooms: 2,
    bathrooms: 1,
    extras: {
      windows: false,
      sofa: false,
      balcony: false,
    },
    extraWindowCount: 3,
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
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
      const sub = state.extraWindowCount * WINDOW_PRICE;
      rows.push([`Мойка окон (${state.extraWindowCount} шт × ${WINDOW_PRICE.toLocaleString("ru-RU")} ₸)`, sub]);
      total += sub;
    }
    if (state.extras.sofa) {
      rows.push(["Химчистка дивана", 10000]);
      total += 10000;
    }
    if (state.extras.balcony) {
      rows.push(["Уборка балкона", 5000]);
      total += 5000;
    }

    return { rows, total };
  };

  const { rows, total } = calculateTotal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const address = state.address.trim();
    const phoneRaw = state.phone.trim();

    if (!state.name.trim() || !phoneRaw || !address || !state.date || !state.time) {
      toast.error("Заполните все обязательные поля перед отправкой.");
      return;
    }

    if (!isPhoneComplete(phoneRaw)) {
      toast.error("Укажите полный номер телефона.");
      return;
    }

    const selectedExtras = buildSelectedExtrasLabels(state);
    const extrasText = selectedExtras.join(", ");
    const phone = phoneForSubmit(phoneRaw);
    const totalPrice = Number(Math.round(total));
    const formData = {
      name: state.name.trim(),
      cleaningType: NAMES[state.service],
      area: state.area,
      address,
      date: state.date,
      time: state.time,
    };

    setIsSubmitting(true);

    const sendToCrm = async () => {
      try {
        const crmPayload = buildCRMPayload({
          name: formData.name,
          phone,
          serviceType: formData.cleaningType,
          area: Number(formData.area),
          extras: selectedExtras,
          totalPrice,
          address: formData.address,
          date: formData.date,
          time: formData.time,
        });
        await submitLeadToQazCrm(crmPayload);
        return true;
      } catch (error) {
        console.error("QazCRM submit failed:", error);
        return false;
      }
    };

    const sendToMake = async () => {
      try {
        await submitBookingToMakeBackup({
          client_phone: formatClientPhoneForSheets(phone),
          current_step: 7,
          cleaning_type: formData.cleaningType,
          area: Number(formData.area),
          address: formData.address,
          date_time: `${formData.date} ${formData.time}`.trim(),
          extras: extrasText,
          calculated_price: Number(totalPrice),
          status: "confirmed",
        });
        return true;
      } catch (error) {
        console.error("Make webhook submit failed:", error);
        return false;
      }
    };

    const [crmOk, makeOk] = await Promise.all([sendToCrm(), sendToMake()]);

    if (crmOk || makeOk) {
      setIsSuccess(true);
      if (!crmOk || !makeOk) {
        toast.warning(
          "Заявка принята, но один из каналов недоступен. Мы всё равно свяжемся с вами.",
        );
      }
    } else {
      toast.error(
        "Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в WhatsApp.",
      );
    }

    setIsSubmitting(false);
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
      <form onSubmit={handleSubmit} className="grid gap-0 md:grid-cols-2">
        {/* Left Column - Calculator */}
        <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 border-b md:border-b-0 md:border-r border-gray-200">
        {/* Step 1: Service Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Выберите услугу
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(["wet", "general", "renovation"] as ServiceType[]).map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => selectService(service)}
                className={`min-w-0 w-full overflow-hidden rounded-xl border-2 p-3 text-left transition-all sm:p-4 ${
                  state.service === service
                    ? "border-green-700 bg-green-50"
                    : "border-gray-200 bg-white hover:border-green-300"
                }`}
              >
                <div
                  className={`mb-1 break-words text-sm font-medium leading-tight sm:text-base ${
                    state.service === service ? "text-green-900" : "text-gray-900"
                  }`}
                >
                  {NAMES[service]}
                </div>
                <div
                  className={`text-xs sm:text-sm ${
                    state.service === service ? "text-green-700" : "text-gray-500"
                  }`}
                >
                  {PRICES[service]} ₸/м²
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Rooms, bathrooms & area */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <CounterField
              label="Комнат"
              value={state.rooms}
              min={1}
              max={10}
              onChange={(rooms) => setState((prev) => ({ ...prev, rooms }))}
            />
            <CounterField
              label="Санузлов"
              value={state.bathrooms}
              min={1}
              max={5}
              onChange={(bathrooms) => setState((prev) => ({ ...prev, bathrooms }))}
            />
          </div>
          <div>
          <p className="mb-3 block text-sm font-medium" id="apartment-area-heading">
            Площадь квартиры
          </p>
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
                <div className="text-xs text-gray-500">{preset.sublabel}</div>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <label
              htmlFor="apartment-area-slider"
              className="text-sm text-gray-600 shrink-0"
            >
              Точная площадь:
            </label>
            <input
              id="apartment-area-slider"
              type="range"
              min="20"
              max="200"
              step="5"
              value={state.area}
              onChange={(e) => setArea(parseInt(e.target.value))}
              aria-labelledby="apartment-area-heading apartment-area-slider"
              aria-label="Точная площадь квартиры"
              className="w-full min-w-0 flex-1 h-2 cursor-pointer accent-green-600"
            />
            <span className="font-medium shrink-0 text-green-600 sm:min-w-[58px] sm:text-right">
              {state.area} м²
            </span>
          </div>
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
            <div className="mt-3 flex flex-wrap items-center gap-3 rounded-lg bg-green-50 p-3">
              <label htmlFor="window-count" className="text-sm text-gray-700">
                Количество окон:
              </label>
              <input
                id="window-count"
                type="number"
                min="1"
                max="30"
                inputMode="numeric"
                pattern="[0-9]*"
                aria-label="Количество окон"
                value={state.extraWindowCount}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    extraWindowCount: parseInt(e.target.value) || 1,
                  }))
                }
                className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-center"
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
          <h3 className="mb-5 sm:mb-6 text-center text-lg sm:text-xl md:text-left">
            Оформить заявку
          </h3>

          {isSuccess ? (
            <div className="rounded-xl border border-green-200 bg-green-50 p-6 sm:p-8 text-center">
              <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-600" />
              <h4 className="mb-3 text-lg font-semibold text-green-900">
                Спасибо за заявку!
              </h4>
              <p className="text-sm leading-relaxed text-green-800 sm:text-base">
                Данные успешно переданы в CRM. Менеджер свяжется с вами в ближайшее
                время.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  aria-label="Ваше имя"
                  autoComplete="name"
                  required
                  disabled={isSubmitting}
                  value={state.name}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="form-input-mobile w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-60"
                  placeholder="Как вас зовут?"
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                  Телефон *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  aria-label="Телефон"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  disabled={isSubmitting}
                  value={state.phone}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      phone: formatPhoneNumber(e.target.value),
                    }))
                  }
                  className="form-input-mobile w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-60"
                  placeholder="+7 (700) 000-00-00"
                />
              </div>

              <div>
                <label htmlFor="address" className="mb-2 block text-sm font-medium">
                  Адрес *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  aria-label="Адрес"
                  autoComplete="street-address"
                  required
                  disabled={isSubmitting}
                  value={state.address}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, address: e.target.value }))
                  }
                  className="form-input-mobile w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-60"
                  placeholder="Улица, дом, квартира"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="date" className="mb-2 block text-sm font-medium">
                    Дата уборки *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    aria-label="Дата уборки"
                    required
                    disabled={isSubmitting}
                    min={new Date().toISOString().split("T")[0]}
                    value={state.date}
                    onChange={(e) =>
                      setState((prev) => ({ ...prev, date: e.target.value }))
                    }
                    className="form-input-mobile w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-60"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="mb-2 block text-sm font-medium">
                    Время *
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    aria-label="Время уборки"
                    required
                    disabled={isSubmitting}
                    value={state.time}
                    onChange={(e) =>
                      setState((prev) => ({ ...prev, time: e.target.value }))
                    }
                    className="form-input-mobile w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="mt-2 max-md:pb-2 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative z-0 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-3 py-3.5 text-sm font-medium text-white shadow-lg transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70 sm:py-4 sm:text-base"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 shrink-0 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5 shrink-0" />
                  )}
                  <span className="text-center">
                    {isSubmitting ? "Отправка..." : "Забронировать уборку"}
                  </span>
                </button>

                <p className="text-mobile-min text-center text-gray-500">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <PrivacyPolicyLink className="text-green-700 underline hover:text-green-800">
                    политикой конфиденциальности
                  </PrivacyPolicyLink>
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="text-center text-sm text-gray-600">
                  ⚡ Ответим в течение 15 минут
                </p>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

function CounterField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-1.5">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="btn-touch flex h-11 w-11 items-center justify-center rounded-md bg-gray-100 transition-colors hover:bg-gray-200"
          aria-label={`Уменьшить ${label}`}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="flex-1 text-center text-lg font-semibold">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="btn-touch flex h-11 w-11 items-center justify-center rounded-md bg-gray-100 transition-colors hover:bg-gray-200"
          aria-label={`Увеличить ${label}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
