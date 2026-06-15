import { MessageCircle, Calculator, Phone, Home } from "lucide-react";
import { WHATSAPP_LINK } from "../utils/whatsapp";
import { SECTIONS } from "../utils/sections";
import { scrollToElementById, scrollToTopSmooth } from "../utils/scroll";
import { AnchorLink } from "./AnchorLink";

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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 shadow-lg backdrop-blur-md md:hidden">
      <div className="grid h-16 grid-cols-4">
        <button
          type="button"
          onClick={handleHome}
          className="flex flex-col items-center justify-center gap-1 text-green-600 transition-colors"
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">Главная</span>
        </button>

        <button
          type="button"
          onClick={handleCalculator}
          className="flex flex-col items-center justify-center gap-1 text-gray-600 transition-colors hover:text-green-600"
        >
          <Calculator className="h-5 w-5" />
          <span className="text-xs">Расчёт</span>
        </button>

        <AnchorLink
          sectionId={SECTIONS.contacts}
          className="flex flex-col items-center justify-center gap-1 text-gray-600 transition-colors hover:text-green-600"
        >
          <Phone className="h-5 w-5" />
          <span className="text-xs">Контакты</span>
        </AnchorLink>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-green-600 transition-colors hover:text-green-700"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
