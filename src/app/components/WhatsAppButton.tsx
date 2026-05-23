import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "../utils/whatsapp";

export function WhatsAppButton() {
  return (
    <>
      {/* Мобильные и планшеты: FAB с пульсацией */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в WhatsApp"
        className="whatsapp-fab-pulse relative lg:hidden fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-105 hover:bg-green-600 active:scale-95"
      >
        <MessageCircle className="relative z-10 h-7 w-7" />
      </a>

      {/* Десктоп: компактная плашка без пульсации */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в WhatsApp"
        className="hidden lg:inline-flex fixed bottom-6 right-6 z-50 items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-medium text-white shadow-md transition-colors hover:bg-green-600"
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp
      </a>
    </>
  );
}
