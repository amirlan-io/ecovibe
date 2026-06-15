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
