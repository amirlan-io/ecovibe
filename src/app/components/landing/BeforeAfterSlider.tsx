import { useEffect, useRef, useState } from "react";

const DEFAULT_BEFORE_SRC = "https://placehold.co/600x400/5c4033/ffffff";
const DEFAULT_AFTER_SRC = "https://placehold.co/600x400/e8f5e9/2d7a3a";

type BeforeAfterSliderProps = {
  beforeLabel?: string;
  afterLabel?: string;
  beforeSrc?: string;
  afterSrc?: string;
};

export function BeforeAfterSlider({
  beforeLabel = "Жир и налёт",
  afterLabel = "Сияющая чистота",
  beforeSrc = DEFAULT_BEFORE_SRC,
  afterSrc = DEFAULT_AFTER_SRC,
}: BeforeAfterSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const getPosition = (clientX: number) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition(Math.round((x / rect.width) * 100));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    getPosition(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    getPosition(e.clientX);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    getPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    getPosition(e.touches[0].clientX);
  };

  const handleTouchEnd = () => setIsDragging(false);

  useEffect(() => {
    const onMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", onMouseUp);
    return () => window.removeEventListener("mouseup", onMouseUp);
  }, []);

  return (
    <div
      ref={sliderRef}
      className="relative aspect-[16/10] w-full max-h-[280px] cursor-col-resize overflow-hidden rounded-xl select-none shadow-lg sm:max-h-[320px] md:max-h-[380px] lg:max-h-[420px]"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* After (clean) — base layer */}
      <img
        src={afterSrc}
        alt={afterLabel}
        width={512}
        height={320}
        sizes="(min-width: 1024px) 512px, (min-width: 768px) 448px, 100vw"
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="lazy"
        draggable={false}
      />

      {/* Before (dirty) — clipped overlay */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeSrc}
          alt={beforeLabel}
          width={512}
          height={320}
          sizes="(min-width: 1024px) 512px, (min-width: 768px) 448px, 100vw"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span className="absolute left-3 top-3 z-20 hidden rounded-full bg-amber-700/90 px-3 py-1 text-xs font-semibold text-white sm:block">
        До
      </span>
      <span className="absolute right-3 top-3 z-20 hidden rounded-full bg-green-600/90 px-3 py-1 text-xs font-semibold text-white sm:block">
        После
      </span>

      {/* Drag handle */}
      <div
        className="absolute inset-y-0 z-10 w-1 cursor-ew-resize bg-white shadow-lg"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        aria-hidden
      >
        <div
          data-handle
          className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-green-600 text-xs font-bold text-white shadow-md md:h-11 md:w-11"
        >
          ↔
        </div>
      </div>
    </div>
  );
}
