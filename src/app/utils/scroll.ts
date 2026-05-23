export const CALCULATOR_ID = "calculator";
export const CALCULATOR_HASH = `#${CALCULATOR_ID}`;

const HEADER_OFFSET_PX = 72;

export function scrollToTop(instant = true) {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: instant ? "auto" : "smooth",
  });
}

export function scrollToTopSmooth() {
  scrollToTop(false);
}

export function scrollToElementById(
  id: string,
  behavior: ScrollBehavior = "smooth",
) {
  const element = document.getElementById(id);
  if (!element) return false;

  const top =
    element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;

  window.scrollTo({ top: Math.max(0, top), left: 0, behavior });
  return true;
}

export function scrollToCalculator() {
  return scrollToElementById(CALCULATOR_ID);
}
