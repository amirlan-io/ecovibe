import { OptimizedPicture } from "./OptimizedPicture";
import { cn } from "./ui/utils";

const LOGO = {
  avif: "/images/logo.avif",
  webp: "/images/logo.webp",
  png: "/images/logo.png",
  jpg: "/images/logo.jpg",
};

interface LogoProps {
  className?: string;
  lazy?: boolean;
}

export function Logo({ className, lazy = false }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
        className ?? "h-10 w-10",
      )}
    >
      <OptimizedPicture
        avifSrc={LOGO.avif}
        webpSrc={LOGO.webp}
        fallbackSrc={LOGO.png}
        alt="EcoVibe.kz Logo"
        className="h-full w-full object-cover"
        loading={lazy ? "lazy" : "eager"}
        width={40}
        height={40}
      />
    </span>
  );
}
