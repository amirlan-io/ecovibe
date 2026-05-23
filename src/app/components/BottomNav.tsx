import { Link, useLocation, useNavigate } from "react-router";
import { Home, Calculator, Phone, MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "../utils/whatsapp";
import { CALCULATOR_HASH, CALCULATOR_ID, scrollToCalculator } from "../utils/scroll";

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const handleWhatsApp = () => {
    window.open(WHATSAPP_LINK, "_blank");
  };

  const handleCalculator = () => {
    if (location.pathname === "/") {
      scrollToCalculator();
      window.history.replaceState(null, "", `/${CALCULATOR_HASH}`);
      return;
    }

    navigate({ pathname: "/", hash: CALCULATOR_ID });
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="grid grid-cols-4 h-16">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isActive("/")
              ? "text-green-600"
              : "text-gray-600 hover:text-green-600"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs">Главная</span>
        </Link>

        <button
          type="button"
          onClick={handleCalculator}
          className="flex flex-col items-center justify-center gap-1 text-gray-600 transition-colors hover:text-green-600"
        >
          <Calculator className="w-5 h-5" />
          <span className="text-xs">Расчет</span>
        </button>

        <Link
          to="/contacts"
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isActive("/contacts")
              ? "text-green-600"
              : "text-gray-600 hover:text-green-600"
          }`}
        >
          <Phone className="w-5 h-5" />
          <span className="text-xs">Контакты</span>
        </Link>

        <button
          type="button"
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center gap-1 text-green-600 transition-colors hover:text-green-700"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs">WhatsApp</span>
        </button>
      </div>
    </nav>
  );
}
