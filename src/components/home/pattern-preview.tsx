/**
 * Decorative stitch-grid preview
 * ------------------------------
 * Handles: drawing a tiny CSS grid of coloured squares so the home page can
 *          show “example patterns” without the real converter. Each cell is a
 *          perfect square — same rule the future engine will keep.
 *
 * Does not handle: palette reduction, SVG export, or written instructions.
 */

export function PatternPreview({
  grid,
  label,
}: {
  grid: string[][];
  label: string;
}) {
  const columns = grid[0]?.length ?? 0;

  return (
    <div
      role="img"
      aria-label={label}
      className="aspect-square w-full overflow-hidden rounded-2xl border border-border bg-surface"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {grid.flatMap((row, y) =>
        row.map((hex, x) => (
          <span
            key={`${x}-${y}`}
            style={{ background: hex, aspectRatio: "1 / 1" }}
          />
        )),
      )}
    </div>
  );
}

/** Quiet sample palettes — the UI chrome stays out of these colours. */
export const EXAMPLE_GRIDS = {
  flower: [
    ["#f6f3ee", "#f6f3ee", "#c45c4a", "#c45c4a", "#f6f3ee", "#f6f3ee"],
    ["#f6f3ee", "#c45c4a", "#e8a090", "#e8a090", "#c45c4a", "#f6f3ee"],
    ["#c45c4a", "#e8a090", "#3f6f64", "#3f6f64", "#e8a090", "#c45c4a"],
    ["#c45c4a", "#e8a090", "#3f6f64", "#3f6f64", "#e8a090", "#c45c4a"],
    ["#f6f3ee", "#c45c4a", "#e8a090", "#e8a090", "#c45c4a", "#f6f3ee"],
    ["#f6f3ee", "#f6f3ee", "#c45c4a", "#c45c4a", "#f6f3ee", "#f6f3ee"],
  ],
  house: [
    ["#dfe7ee", "#dfe7ee", "#3d3833", "#3d3833", "#dfe7ee", "#dfe7ee"],
    ["#dfe7ee", "#3d3833", "#9a4a3c", "#9a4a3c", "#3d3833", "#dfe7ee"],
    ["#3d3833", "#9a4a3c", "#9a4a3c", "#9a4a3c", "#9a4a3c", "#3d3833"],
    ["#d4c4a8", "#d4c4a8", "#d4c4a8", "#5b4638", "#d4c4a8", "#d4c4a8"],
    ["#d4c4a8", "#6d8aa8", "#d4c4a8", "#5b4638", "#6d8aa8", "#d4c4a8"],
    ["#d4c4a8", "#d4c4a8", "#d4c4a8", "#5b4638", "#d4c4a8", "#d4c4a8"],
  ],
  cat: [
    ["#f6f3ee", "#4a4450", "#f6f3ee", "#f6f3ee", "#4a4450", "#f6f3ee"],
    ["#f6f3ee", "#4a4450", "#4a4450", "#4a4450", "#4a4450", "#f6f3ee"],
    ["#f6f3ee", "#4a4450", "#c9a227", "#4a4450", "#c9a227", "#4a4450"],
    ["#f6f3ee", "#4a4450", "#4a4450", "#4a4450", "#4a4450", "#4a4450"],
    ["#f6f3ee", "#4a4450", "#e8ddd0", "#4a4450", "#4a4450", "#f6f3ee"],
    ["#f6f3ee", "#4a4450", "#f6f3ee", "#f6f3ee", "#4a4450", "#f6f3ee"],
  ],
} as const;
