import { MapPin, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { AnchorLink } from "./AnchorLink";
import { NAV_ITEMS, SECTIONS } from "../utils/sections";
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
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-gray-200/60 bg-white/85 shadow-sm backdrop-blur-md"
            : "border-b border-transparent bg-white/90 backdrop-blur-sm",
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
              <AnchorLink
                sectionId={SECTIONS.calculator}
                onClick={closeMobileMenu}
                className="btn btn-touch flex w-full items-center justify-center rounded-lg bg-green-600 py-3 font-medium text-white transition-colors hover:bg-green-700"
              >
                Заказать уборку
              </AnchorLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
