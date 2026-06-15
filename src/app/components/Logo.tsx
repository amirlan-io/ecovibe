import { OptimizedPicture } from "./OptimizedPicture";

const LOGO = {
  avif: "/images/logo.avif",
  webp: "/images/logo.webp",
  jpg: "/images/logo.jpg",
};

interface LogoProps {
  className?: string;
  lazy?: boolean;
}

export function Logo({ className = "w-10 h-10", lazy = false }: LogoProps) {
  return (
    <OptimizedPicture
      avifSrc={LOGO.avif}
      webpSrc={LOGO.webp}
      fallbackSrc={LOGO.jpg}
      alt="EcoVibe.kz Logo"
      className={className}
      loading={lazy ? "lazy" : "eager"}
      width={40}
      height={40}
    />
  );
}
