/**
 * Pattern data model (shared format)
 * ----------------------------------
 * Handles: the TypeScript shape every future surface must use — converter,
 *          designer, gallery, PDF, and the database. One format everywhere
 *          so a pattern saved from a photo is identical to one painted by
 *          hand.
 *
 * Does not handle: creating grids, colour reduction, or written instructions.
 * Those modules will live next to this file later (`converter.ts`,
 * `builder.ts`, `instructions.ts`). Grids are NEVER produced by an
 * image-generation AI.
 */

export const TECHNIQUES = ["tapestry", "c2c", "graphghan"] as const;
export type Technique = (typeof TECHNIQUES)[number];

export const PATTERN_SOURCES = ["converter", "builder", "curated"] as const;
export type PatternSource = (typeof PATTERN_SOURCES)[number];

export const VISIBILITY = ["private", "pending", "public"] as const;
export type Visibility = (typeof VISIBILITY)[number];

/**
 * One yarn colour in the palette.
 * `symbol` and `letter` exist so colour-blind makers can read the chart
 * without relying on hue alone (toggle: colours / symbols / both).
 */
export type PaletteColor = {
  id: string;
  hex: string;
  name: string;
  symbol: string;
  letter: string;
};

/**
 * Snapshot of the maker’s display preferences at save time.
 * Handedness is stored for convenience but MUST NOT be used to rewrite
 * `grid` — it only changes how charts and rows are labelled.
 */
export type PatternSettingsSnapshot = {
  handedness: "right" | "left";
  terminology: "us" | "uk" | "da";
  units: "cm" | "in";
};

export type Pattern = {
  id: string;
  title: string;
  technique: Technique;
  width: number;
  height: number;
  palette: PaletteColor[];
  /** 2D array of palette ids. `grid[row][col]`. Squares are 1×1 stitches. */
  grid: string[][];
  settings: PatternSettingsSnapshot;
  createdBy: string | null;
  visibility: Visibility;
  source: PatternSource;
  price: number;
  createdAt: string;
};
