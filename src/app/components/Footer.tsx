import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { AnchorLink } from "./AnchorLink";
import { ThreadsIcon } from "./icons/ThreadsIcon";
import { PrivacyPolicyLink } from "./PrivacyPolicyLink";
import { NAV_ITEMS } from "../utils/sections";
import { WHATSAPP_LINK } from "../utils/whatsapp";

export function Footer() {
  return (
    <footer id="contacts" className="scroll-mt-20 mt-0 bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Logo />
              <span className="text-lg font-semibold text-white">EcoVibe.kz</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
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
                    className="text-gray-400 transition-colors duration-300 hover:text-green-400"
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
                  href="tel:+77073204199"
                  className="flex items-center gap-2 text-gray-400 transition-colors hover:text-green-400"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  +7 707 320 41 99
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 transition-colors hover:text-green-400"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@ecovibe.kz"
                  className="flex items-center gap-2 text-gray-400 transition-colors hover:text-green-400"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  info@ecovibe.kz
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
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
                    aria-label="Instagram"
                    className="text-gray-400 transition-colors hover:text-green-400"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.threads.com/@ecovibekz"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Threads"
                    className="text-gray-400 transition-colors hover:text-green-400"
                  >
                    <ThreadsIcon className="h-5 w-5" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-medium text-white">Юридическая информация</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>ТОО «EcoVibe»</li>
              <li>Республика Казахстан, г. Астана</li>
              <li>
                <PrivacyPolicyLink className="text-gray-400 no-underline transition-colors hover:text-green-400 hover:underline">
                  Политика конфиденциальности
                </PrivacyPolicyLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>
            &copy; 2026 EcoVibe.kz. Клининговые услуги в Астане. Поддерживаем инклюзивное
            трудоустройство и социальные инициативы. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
