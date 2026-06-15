import { useCallback, useRef, useState } from "react";

export function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPosition((x / rect.width) * 100);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl select-none touch-none shadow-xl"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* After (clean) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-green-50">
        <div className="flex h-full flex-col items-center justify-center p-8 text-center">
          <span className="mb-2 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
            После
          </span>
          <p className="text-lg font-semibold text-gray-800">Сияющая чистота</p>
          <p className="mt-2 text-sm text-gray-500">Плита, кафель и поверхности как новые</p>
        </div>
      </div>

      {/* Before (dirty) — clipped */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-stone-700 to-gray-800"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="flex h-full flex-col items-center justify-center p-8 text-center">
          <span className="mb-2 rounded-full bg-amber-700 px-3 py-1 text-xs font-semibold text-white">
            До
          </span>
          <p className="text-lg font-semibold text-white">Жир и налёт</p>
          <p className="mt-2 text-sm text-white/80">Типичное состояние до уборки</p>
        </div>
      </div>

      {/* Divider */}
      <div
        className="absolute inset-y-0 z-10 w-1 cursor-ew-resize bg-white shadow-lg"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        onPointerDown={onPointerDown}
      >
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-green-600 text-xs font-bold text-white shadow-md">
          ↔
        </div>
      </div>
    </div>
  );
}
