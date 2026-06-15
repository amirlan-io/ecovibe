import { MessageCircle, Calculator, Phone, Home } from "lucide-react";
import { WHATSAPP_LINK } from "../utils/whatsapp";
import { PHONE_TEL } from "../utils/phone";
import { SECTIONS } from "../utils/sections";
import { scrollToElementById, scrollToTopSmooth } from "../utils/scroll";

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
    <nav className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-gray-200 bg-white/95 shadow-lg backdrop-blur-md md:hidden">
      <div className="grid h-16 min-h-[64px] grid-cols-4">
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

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 flex-col items-center justify-center gap-1 text-green-600 transition-colors hover:text-green-700"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
