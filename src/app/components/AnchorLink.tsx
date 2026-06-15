import type { ComponentProps, MouseEvent } from "react";
import { scrollToElementById, scrollToTopSmooth } from "../utils/scroll";
import { cn } from "./ui/utils";

type AnchorLinkProps = ComponentProps<"a"> & {
  sectionId?: string;
  scrollToTop?: boolean;
};

export function AnchorLink({
  sectionId,
  scrollToTop: toTop,
  className,
  children,
  onClick,
  href,
  ...props
}: AnchorLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClick?.(event);

    if (toTop) {
      scrollToTopSmooth();
      window.history.replaceState(null, "", "/");
      return;
    }

    if (sectionId) {
      scrollToElementById(sectionId);
      window.history.replaceState(null, "", `/#${sectionId}`);
    }
  };

  const resolvedHref = toTop ? "/" : sectionId ? `/#${sectionId}` : href ?? "#";

  return (
    <a href={resolvedHref} className={cn(className)} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
