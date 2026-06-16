import { AtSign, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { AnchorLink } from "./AnchorLink";
import { PrivacyPolicyLink } from "./PrivacyPolicyLink";
import { NAV_ITEMS } from "../utils/sections";
import { PHONE_DISPLAY, PHONE_TEL } from "../utils/phone";
import { WHATSAPP_LINK } from "../utils/whatsapp";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.115 1.523 5.842L.057 23.5l5.797-1.476A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.51-5.17-1.399l-.37-.22-3.44.877.909-3.32-.242-.384A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ThreadsSocialIcon() {
  return <AtSign className="h-5 w-5" aria-hidden />;
}

export function Footer() {
  return (
    <footer id="contacts" className="mt-auto shrink-0 scroll-mt-20 bg-gray-900 text-gray-200 pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Logo lazy className="w-10 h-10" />
              <span className="text-lg font-semibold text-white">EcoVibe.kz</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-300">
              Профессиональный клининг в Астане. Эко-средства, обученные мастера и забота о
              каждом клиенте.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-medium text-white">Меню</h4>
            <ul className="space-y-2 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <AnchorLink
                    sectionId={item.id}
                    className="text-gray-300 transition-colors duration-300 hover:text-green-400"
                  >
                    {item.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-medium text-white">Контакты</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={PHONE_TEL}
                  className="btn-touch flex items-center gap-2 text-gray-300 transition-colors hover:text-green-400"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] items-center gap-2 text-green-400 transition-colors hover:text-green-300"
                >
                  <WhatsAppIcon />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@ecovibe.kz"
                  className="flex items-center gap-2 text-gray-300 transition-colors hover:text-green-400"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  info@ecovibe.kz
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  г. Астана, Казахстан
                  <br />
                  Ежедневно: 08:00 — 22:00
                </span>
              </li>
              <li>
                <div className="flex items-center gap-3 pt-1">
                  <a
                    href="https://www.instagram.com/ecovibekz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram EcoVibe"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-gray-200 transition-colors hover:bg-white/20 hover:text-white"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    href="https://www.threads.com/@ecovibekz"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Threads EcoVibe"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-gray-200 transition-colors hover:bg-white/20 hover:text-white"
                  >
                    <ThreadsSocialIcon />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-medium text-white">Юридическая информация</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>ТОО «EcoVibe»</li>
              <li>Республика Казахстан, г. Астана</li>
              <li>
                <PrivacyPolicyLink className="text-gray-300 no-underline transition-colors hover:text-green-400 hover:underline">
                  Политика конфиденциальности
                </PrivacyPolicyLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; 2026 EcoVibe.kz. Клининговые услуги в Астане. Поддерживаем инклюзивное
            трудоустройство и социальные инициативы. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
