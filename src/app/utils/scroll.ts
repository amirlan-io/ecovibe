export const CALCULATOR_ID = "calculator";
export const CALCULATOR_HASH = `#${CALCULATOR_ID}`;

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

  requestAnimationFrame(() => {
    element.scrollIntoView({ behavior, block: "start" });
  });
  return true;
}

export function scrollToCalculator() {
  return scrollToElementById(CALCULATOR_ID);
}
