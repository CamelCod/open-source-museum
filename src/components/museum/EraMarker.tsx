"use client";

import { getEraForYear } from "@/lib/scoring";

interface EraMarkerProps {
  year: number;
}

export default function EraMarker({ year }: EraMarkerProps) {
  const era = getEraForYear(year);

  return (
    <div className="hidden lg:flex flex-col items-center justify-center writing-mode-vertical sticky top-1/2 -translate-y-1/2">
      <span className="text-xs text-zinc-600 uppercase tracking-widest font-semibold [writing-mode:vertical-rl] rotate-180">
        {era}
      </span>
    </div>
  );
}
