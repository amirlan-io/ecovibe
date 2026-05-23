import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { scrollToTopSmooth } from "../utils/scroll";

interface PrivacyPolicyLinkProps {
  className?: string;
  children?: ReactNode;
}

export function PrivacyPolicyLink({
  className = "text-green-600 underline underline-offset-2 transition-colors hover:text-green-700",
  children = "Политика конфиденциальности",
}: PrivacyPolicyLinkProps) {
  const location = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/privacy") {
      e.preventDefault();
      scrollToTopSmooth();
    }
  };

  return (
    <Link to="/privacy" onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
