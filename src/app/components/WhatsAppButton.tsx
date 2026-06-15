import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "../utils/whatsapp";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в WhatsApp"
      className="btn hidden md:inline-flex fixed bottom-6 right-6 z-50 items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-medium text-white shadow-md transition-colors hover:bg-green-600"
    >
      <MessageCircle className="h-5 w-5" />
      WhatsApp
    </a>
  );
}
