/**
 * Pattern engine barrel
 * ---------------------
 * Handles: re-exporting the shared types so app code can import from
 *          `@/lib/pattern`. Keep this folder free of React — it must stay
 *          testable in plain TypeScript.
 *
 * Does not handle: the converter or designer yet (shell only).
 */

export type {
  PaletteColor,
  Pattern,
  PatternSettingsSnapshot,
  PatternSource,
  Technique,
  Visibility,
} from "./types";

export {
  PATTERN_SOURCES,
  TECHNIQUES,
  VISIBILITY,
} from "./types";
