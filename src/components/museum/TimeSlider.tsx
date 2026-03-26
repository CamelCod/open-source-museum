"use client";

interface TimeSliderProps {
  year: number;
  onChange: (year: number) => void;
  min?: number;
  max?: number;
}

export default function TimeSlider({
  year,
  onChange,
  min = 1991,
  max = 2025,
}: TimeSliderProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-zinc-500">{min}</span>
        <span className="text-2xl font-bold tabular-nums text-white">{year}</span>
        <span className="text-xs text-zinc-500">{max}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={year}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Timeline year slider"
        className="w-full h-2 rounded-full appearance-none bg-zinc-700 cursor-pointer accent-blue-500"
      />
      <div className="flex justify-between mt-1">
        {[1991, 2000, 2010, 2020, 2025].map((y) => (
          <button
            key={y}
            onClick={() => onChange(y)}
            aria-label={`Jump to ${y}`}
            className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors"
          >
            {y}
          </button>
        ))}
      </div>
    </div>
  );
}
