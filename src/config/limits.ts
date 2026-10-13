/**
 * Pattern limits — SINGLE source of truth
 * --------------------------------------
 * Handles: numeric constraints for grids, palettes, uploads, and rate-ish
 *          guest quotas. Import these constants instead of scattering magic
 *          numbers through components.
 *
 * Does not handle: actually enforcing the limits. Enforcement belongs on the
 * server (route handler / Supabase function). The UI should read from here so
 * it stays in sync, but a determined client can still be bypassed — hence
 * server-side checks later.
 */

/** Inclusive palette size for a generated / saved pattern. */
export const COLOR_LIMITS = {
  min: 3,
  max: 6,
  /**
   * Tapestry crochet gets muddy when too many colors are carried in a row.
   * This is a hint, not a hard block.
   */
  tapestryRecommendedMax: 4,
  tapestryRecommendedMin: 2,
} as const;

/** Inclusive stitch-grid dimensions. Squares are always 1×1 stitches. */
export const GRID_LIMITS = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: 100,
  maxHeight: 100,
} as const;

/**
 * Image-upload rules for the (future) photo converter.
 * Original photos stay in the browser; we still validate type and size.
 */
export const UPLOAD_LIMITS = {
  maxBytes: 10 * 1024 * 1024, // 10 MB
  acceptedMimeTypes: ["image/jpeg", "image/png", "image/webp"] as const,
  acceptedExtensions: ["jpg", "jpeg", "png", "webp"] as const,
};

/** Warn in tapestry instructions when a color is carried this many stitches. */
export const TAPESTRY_FLOAT_WARN_STITCHES = 6;

/** Warn in tapestry when a single row uses more than this many colors. */
export const TAPESTRY_ROW_COLOR_WARN = 2;
