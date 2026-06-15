import { MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { AnchorLink } from "./AnchorLink";
import { NAV_ITEMS, SECTIONS } from "../utils/sections";
import { WHATSAPP_LINK } from "../utils/whatsapp";
import { cn } from "./ui/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-gray-200/60 bg-white/85 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-white/90 backdrop-blur-sm",
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <AnchorLink
            scrollToTop
            onClick={closeMobileMenu}
            className="flex shrink-0 items-center gap-2"
          >
            <Logo />
            <span className="text-lg font-semibold">EcoVibe</span>
          </AnchorLink>

          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            {NAV_ITEMS.map((item) => (
              <AnchorLink
                key={item.id}
                sectionId={item.id}
                className="text-sm text-gray-600 transition-colors duration-300 hover:text-green-600"
              >
                {item.label}
              </AnchorLink>
            ))}
          </div>

          <div className="hidden items-center gap-2 sm:gap-3 md:flex lg:gap-4">
            <span className="hidden items-center gap-1 text-sm text-gray-500 lg:flex">
              <MapPin className="h-4 w-4 shrink-0" />
              г. Астана
            </span>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-white transition-all duration-300 hover:bg-green-500"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="tel:+77073204199"
              className="hidden items-center gap-1.5 text-sm font-medium text-gray-800 transition-colors hover:text-green-600 sm:flex"
            >
              <Phone className="h-4 w-4 shrink-0" />
              +7 707 320 41 99
            </a>
            <AnchorLink
              sectionId={SECTIONS.calculator}
              className="inline-flex min-h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-green-700 sm:px-4"
            >
              Заказать
            </AnchorLink>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="space-y-1 border-t border-gray-200 py-4 lg:hidden">
            <p className="mb-2 flex items-center gap-1 px-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              г. Астана
            </p>
            {NAV_ITEMS.map((item) => (
              <AnchorLink
                key={item.id}
                sectionId={item.id}
                onClick={closeMobileMenu}
                className="block rounded-lg px-3 py-2.5 text-gray-700 transition-colors hover:bg-green-50 hover:text-green-700"
              >
                {item.label}
              </AnchorLink>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-3">
              <AnchorLink
                sectionId={SECTIONS.calculator}
                onClick={closeMobileMenu}
                className="mx-3 flex min-h-12 items-center justify-center rounded-lg bg-green-600 font-medium text-white transition-colors hover:bg-green-700"
              >
                Заказать уборку
              </AnchorLink>
              <a
                href="tel:+77073204199"
                className="flex min-h-12 items-center gap-2 px-3 py-2 text-gray-900"
              >
                <Phone className="h-4 w-4" />
                +7 707 320 41 99
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-3 flex min-h-12 items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-medium text-white"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
