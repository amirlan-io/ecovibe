import { Calculator, Phone, Home } from "lucide-react";
import { WHATSAPP_NUMBER } from "../utils/whatsapp";
import { PHONE_TEL } from "../utils/phone";
import { SECTIONS } from "../utils/sections";
import { scrollToElementById, scrollToTopSmooth } from "../utils/scroll";

const ORDER_WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Хочу заказать уборку")}`;

export function BottomNav() {
  const handleCalculator = () => {
    scrollToElementById(SECTIONS.calculator);
    window.history.replaceState(null, "", `/#${SECTIONS.calculator}`);
  };

  const handleHome = () => {
    scrollToTopSmooth();
    window.history.replaceState(null, "", "/");
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center gap-2 border-t border-gray-100 bg-white px-2 sm:px-3 md:hidden">
      <div className="flex min-w-0 flex-1 items-center justify-around">
        <button
          type="button"
          onClick={handleHome}
          className="flex min-h-12 flex-col items-center justify-center gap-1 text-green-600 transition-colors"
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">Главная</span>
        </button>

        <button
          type="button"
          onClick={handleCalculator}
          className="flex min-h-12 flex-col items-center justify-center gap-1 text-gray-600 transition-colors hover:text-green-600"
        >
          <Calculator className="h-5 w-5" />
          <span className="text-xs">Расчёт</span>
        </button>

        <a
          href={PHONE_TEL}
          aria-label="Позвонить"
          className="flex min-h-12 min-w-[44px] flex-col items-center justify-center gap-1 font-medium text-green-600 transition-colors hover:text-green-700"
        >
          <Phone className="h-5 w-5" />
          <span className="text-xs">Позвонить</span>
        </a>
      </div>

      <a
        href={ORDER_WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-11 shrink-0 items-center justify-center gap-1 rounded-lg bg-green-600 px-2.5 text-xs font-semibold text-white transition-all hover:bg-green-700 active:scale-95 active:bg-green-700 sm:gap-1.5 sm:px-3"
      >
        <span className="whitespace-nowrap">Заказать</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="shrink-0"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </nav>
  );
}
