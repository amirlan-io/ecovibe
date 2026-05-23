import logoImg from "../../imports/______________2026-05-20___13.08.49.png";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "w-10 h-10" }: LogoProps) {
  return (
    <img
      src={logoImg}
      alt="EcoVibe.kz Logo"
      className={className}
    />
  );
}
