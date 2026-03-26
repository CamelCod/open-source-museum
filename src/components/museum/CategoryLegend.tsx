import { CATEGORY_COLORS } from "@/lib/scoring";
import type { MilestoneCategory } from "@/types";

export default function CategoryLegend() {
  return (
    <div className="flex flex-wrap gap-3">
      {(Object.entries(CATEGORY_COLORS) as [MilestoneCategory, string][]).map(
        ([category, color]) => (
          <div key={category} className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-zinc-400">{category}</span>
          </div>
        )
      )}
    </div>
  );
}
