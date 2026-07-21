export const SECTIONS = {
  services: "services",
  calculator: "calculator",
  prices: "prices",
  reviews: "reviews",
  contacts: "contacts",
} as const;

export const NAV_ITEMS = [
  { label: "Услуги", id: SECTIONS.services },
  { label: "Калькулятор", id: SECTIONS.calculator },
  { label: "Цены", id: SECTIONS.prices },
  { label: "Отзывы", id: SECTIONS.reviews },
  { label: "Контакты", id: SECTIONS.contacts },
] as const;

/** Отдельные страницы сайта (не якоря на главной) — для навигации и внутренней перелинковки. */
export const PAGE_LINKS = [
  { label: "Генеральная уборка", to: "/generalnaya-uborka" },
  { label: "Влажная уборка", to: "/vlazhnaya-uborka" },
  { label: "Уборка квартир", to: "/uborka-kvartir-astana" },
  { label: "Уборка офисов", to: "/uborka-ofisov-astana" },
  { label: "Уборка после ремонта", to: "/uborka-posle-remonta-astana" },
  { label: "Химчистка мебели", to: "/himchistka-mebeli-astana" },
  { label: "О нас", to: "/o-nas" },
  { label: "Вакансии", to: "/vakansii" },
  { label: "Страница контактов", to: "/kontakty" },
] as const;
