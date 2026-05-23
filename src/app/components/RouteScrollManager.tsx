import { useEffect } from "react";
import { useLocation } from "react-router";
import {
  CALCULATOR_ID,
  scrollToCalculator,
  scrollToElementById,
  scrollToTop,
} from "../utils/scroll";

/** Скролл наверх при смене страницы и обработка якорей (#calculator). */
export function RouteScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const scrollToTarget = () => {
        if (id === CALCULATOR_ID) {
          scrollToCalculator();
        } else {
          scrollToElementById(id);
        }
      };

      requestAnimationFrame(() => requestAnimationFrame(scrollToTarget));
      return;
    }

    scrollToTop(true);
  }, [pathname, hash]);

  return null;
}
