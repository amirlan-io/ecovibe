import { MapPin, Menu, X } from "lucide-react";
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

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleMobileMenu = () => setMobileMenuOpen((open) => !open);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 transition-all duration-300",
          mobileMenuOpen
            ? "z-[10001] border-b border-gray-200/60 bg-white shadow-sm"
            : cn(
                "z-50",
                scrolled
                  ? "border-b border-gray-200/60 bg-white/85 shadow-sm backdrop-blur-md"
                  : "border-b border-transparent bg-white/90 backdrop-blur-sm",
              ),
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Основная навигация">
          <div className="flex h-16 items-center justify-between gap-3">
            <AnchorLink
              scrollToTop
              onClick={closeMobileMenu}
              className="flex shrink-0 items-center gap-2"
            >
              <Logo />
              <span className="text-lg font-semibold">EcoVibe</span>
            </AnchorLink>

            <div className="nav-links hidden items-center gap-6 md:flex lg:gap-8">
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

            <div className="hidden items-center gap-2 md:flex lg:gap-4">
              <span className="hidden items-center gap-1 text-sm text-gray-500 lg:flex">
                <MapPin className="h-4 w-4 shrink-0" />
                г. Астана
              </span>
              <AnchorLink
                sectionId={SECTIONS.calculator}
                className="btn inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-green-700"
              >
                Заказать
              </AnchorLink>
            </div>

            <button
              type="button"
              className="burger-btn btn-touch flex h-11 w-11 items-center justify-center rounded-lg text-gray-800 md:hidden"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-drawer"
              aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[10000] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Закрыть меню"
            onClick={closeMobileMenu}
          />
          <div
            id="mobile-drawer"
            className="absolute inset-x-0 bottom-0 top-16 flex flex-col bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Мобильное меню"
          >
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <p className="mb-4 flex items-center gap-1 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                г. Астана
              </p>
              <nav className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <AnchorLink
                    key={item.id}
                    sectionId={item.id}
                    onClick={closeMobileMenu}
                    className="btn-touch block rounded-lg px-3 py-3.5 text-base font-medium text-gray-800 transition-colors hover:bg-green-50 hover:text-green-700"
                  >
                    {item.label}
                  </AnchorLink>
                ))}
              </nav>
            </div>

            <div className="border-t border-gray-100 p-4">
              <div className="grid grid-cols-2 gap-3">
                <AnchorLink
                  sectionId={SECTIONS.calculator}
                  onClick={closeMobileMenu}
                  className="btn btn-touch flex min-h-11 items-center justify-center rounded-lg bg-green-600 px-3 py-3 text-center font-medium text-white transition-colors hover:bg-green-700"
                >
                  Заказать уборку
                </AnchorLink>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="btn btn-touch flex min-h-11 items-center justify-center gap-1.5 rounded-lg border border-green-600 bg-white px-3 py-3 text-center font-medium text-green-700 transition-colors hover:bg-green-50"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-green-600" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.17 1.535 5.943L.057 23.854a.75.75 0 00.918.918l5.911-1.478A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.513-5.228-1.405l-.374-.222-3.872.968.987-3.77-.243-.387A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
