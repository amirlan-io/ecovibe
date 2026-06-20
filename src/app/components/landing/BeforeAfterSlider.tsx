import { useCallback, useRef, useState } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = boundsRef.current;
    if (!rect) return;
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPosition((x / rect.width) * 100);
  }, []);

  const refreshBounds = useCallback(() => {
    const el = containerRef.current;
    boundsRef.current = el ? el.getBoundingClientRect() : null;
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    containerRef.current?.setPointerCapture(e.pointerId);
    requestAnimationFrame(() => {
      refreshBounds();
      updatePosition(e.clientX);
    });
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    containerRef.current?.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full max-h-[280px] overflow-hidden rounded-xl select-none shadow-lg sm:max-h-[320px] md:max-h-[380px] lg:max-h-[420px]"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* After (clean) — base layer */}
      <img
        src={afterSrc}
        alt={afterLabel}
        width={320}
        height={427}
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
          width={320}
          height={427}
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
