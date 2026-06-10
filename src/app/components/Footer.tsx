import { Link } from "react-router";
import { Instagram, Phone, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { ThreadsIcon } from "./icons/ThreadsIcon";
import { PrivacyPolicyLink } from "./PrivacyPolicyLink";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logo />
              <span className="font-semibold text-lg">EcoVibe.kz</span>
            </div>
            <p className="text-sm text-gray-600">
              Профессиональная уборка в Астане с использованием eco-средств
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/wet-cleaning" className="text-gray-600 hover:text-green-600">
                  Влажная уборка
                </Link>
              </li>
              <li>
                <Link to="/general-cleaning" className="text-gray-600 hover:text-green-600">
                  Генеральная уборка
                </Link>
              </li>
              <li>
                <Link to="/prices" className="text-gray-600 hover:text-green-600">
                  Цены
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Компания</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-green-600">
                  О нас
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-green-600">
                  Вакансии
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-gray-600 hover:text-green-600">
                  Контакты
                </Link>
              </li>
              <li>
                <PrivacyPolicyLink className="text-gray-600 no-underline hover:text-green-600 hover:underline">
                  Политика конфиденциальности
                </PrivacyPolicyLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+77073204199"
                  className="flex items-center gap-2 text-gray-600 hover:text-green-600"
                >
                  <Phone className="w-4 h-4" />
                  +7 707 320 41 99
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@ecovibe.kz"
                  className="flex items-center gap-2 text-gray-600 hover:text-green-600"
                >
                  <Mail className="w-4 h-4" />
                  info@ecovibe.kz
                </a>
              </li>
              <li>
                <span className="mb-2 block text-gray-600">Мы в соцсетях</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/ecovibekz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-5 w-5 items-center justify-center text-gray-600 transition-colors hover:text-green-600"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5 shrink-0" />
                  </a>
                  <a
                    href="https://www.threads.com/@ecovibekz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-5 w-5 items-center justify-center text-gray-600 transition-colors hover:text-green-600"
                    aria-label="Threads"
                  >
                    <ThreadsIcon className="h-5 w-5 shrink-0" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-gray-600 space-y-3">
          <p>
            &copy; 2026 EcoVibe.kz. Клининговые услуги в Астане. Поддерживаем инклюзивное
            трудоустройство и социальные инициативы. Все права защищены.
          </p>
          <p>
            <PrivacyPolicyLink className="text-xs text-muted-foreground hover:text-green-600">
              Политика конфиденциальности
            </PrivacyPolicyLink>
          </p>
        </div>
      </div>
    </footer>
  );
}
