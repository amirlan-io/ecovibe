import { Link, useLocation } from "react-router";
import { Phone, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { CalculatorLink } from "./CalculatorLink";
import { cn } from "./ui/utils";

const desktopNavigation = [
  { name: "Главная", href: "/" },
  { name: "Цены", href: "/prices" },
  { name: "О нас", href: "/about" },
  { name: "Вакансии", href: "/careers" },
  { name: "Контакты", href: "/contacts" },
];

const mobileNavigation = [
  ...desktopNavigation,
  { name: "Влажная уборка", href: "/wet-cleaning" },
  { name: "Генеральная уборка", href: "/general-cleaning" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-gray-200/60 bg-white/80 shadow-sm backdrop-blur-md"
          : "border-b border-border bg-white",
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex shrink-0 items-center gap-2" onClick={closeMobileMenu}>
            <Logo />
            <span className="text-lg font-semibold">EcoVibe.kz</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex lg:gap-10">
            {desktopNavigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm tracking-wide transition-colors",
                  isActive(item.href)
                    ? "font-medium text-green-600"
                    : "text-gray-600 hover:text-green-600",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <a
              href="tel:+77073204199"
              className="flex items-center gap-2 text-gray-700 transition-colors hover:text-green-600"
            >
              <Phone className="h-4 w-4 shrink-0" />
              <span className="text-sm font-medium whitespace-nowrap">+7 707 320 41 99</span>
            </a>
            <CalculatorLink className="whitespace-nowrap rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700">
              Заказать уборку
            </CalculatorLink>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="p-2 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className={cn(
              "space-y-2 border-t py-4 md:hidden",
              scrolled ? "border-gray-200/60" : "border-border",
            )}
          >
            {mobileNavigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={closeMobileMenu}
                className={cn(
                  "block rounded-lg px-4 py-2 transition-colors",
                  isActive(item.href)
                    ? "bg-green-50 font-medium text-green-600"
                    : "text-gray-600 hover:bg-gray-50",
                )}
              >
                {item.name}
              </Link>
            ))}
            <CalculatorLink
              onClick={closeMobileMenu}
              className="block rounded-lg bg-green-600 px-4 py-3 text-center font-medium text-white transition-colors hover:bg-green-700"
            >
              Заказать уборку
            </CalculatorLink>
            <a
              href="tel:+77073204199"
              onClick={closeMobileMenu}
              className="flex items-center gap-2 px-4 py-2 text-gray-900"
            >
              <Phone className="h-4 w-4" />
              <span>+7 707 320 41 99</span>
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
