import type { ComponentProps, MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { CALCULATOR_HASH, CALCULATOR_ID, scrollToCalculator } from "../utils/scroll";
import { cn } from "./ui/utils";

type CalculatorLinkProps = ComponentProps<"a">;

export function CalculatorLink({
  className,
  children,
  onClick,
  ...props
}: CalculatorLinkProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClick?.(event);

    if (location.pathname === "/") {
      scrollToCalculator();
      window.history.replaceState(null, "", `/${CALCULATOR_HASH}`);
      return;
    }

    navigate({ pathname: "/", hash: CALCULATOR_ID });
  };

  return (
    <a
      href={`/${CALCULATOR_HASH}`}
      className={cn(className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}
