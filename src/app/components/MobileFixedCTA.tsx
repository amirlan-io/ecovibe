import { MessageCircle, Phone } from "lucide-react";
import { PHONE_TEL } from "../utils/phone";
import { WHATSAPP_LINK } from "../utils/whatsapp";

export function MobileFixedCTA() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-[4.75rem] z-[999] flex justify-center gap-2 px-4 md:hidden"
      aria-hidden={false}
    >
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-touch pointer-events-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-green-600 bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-lg transition-colors hover:bg-green-50"
      >
        <MessageCircle className="h-5 w-5 shrink-0" />
        WhatsApp
      </a>
      <a
        href={PHONE_TEL}
        className="cta-fixed btn-touch pointer-events-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-green-700"
      >
        <Phone className="h-5 w-5 shrink-0" />
        Позвонить
      </a>
    </div>
  );
}
