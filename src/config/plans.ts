/**
 * Plans / entitlements catalog
 * ----------------------------
 * Handles: describing what each plan is allowed to do. Only `free` is active
 *          today. Extra plan ids exist so Stripe (credit packs, rentals, Pro)
 *          can plug in later without rewriting call sites.
 *
 * Does not handle: billing, Stripe Checkout, or gating UI. Use
 * `getEntitlements()` in `@/lib/entitlements` to read these values.
 *
 * Every numeric limit that a plan can change should live here (or be derived
 * from `@/config/limits`) — never hardcoded in a button or page.
 */

import { COLOR_LIMITS, GRID_LIMITS } from "@/config/limits";

export const PLAN_IDS = ["free", "pro", "credits", "rental"] as const;
export type PlanId = (typeof PLAN_IDS)[number];

export type Entitlements = {
  /** How many generated-and-saved patterns the account may keep per week. */
  patternsPerWeek: number | "unlimited";
  maxColors: number;
  minColors: number;
  maxGridWidth: number;
  maxGridHeight: number;
  /** Small “Made with Stitch & Tell” line on exported PDFs. */
  pdfBranding: boolean;
  canSavePrivate: boolean;
  canPublishToGallery: boolean;
};

export const PLANS: Record<PlanId, Entitlements> = {
  free: {
    patternsPerWeek: 1,
    minColors: COLOR_LIMITS.min,
    maxColors: COLOR_LIMITS.max,
    maxGridWidth: GRID_LIMITS.maxWidth,
    maxGridHeight: GRID_LIMITS.maxHeight,
    pdfBranding: true,
    canSavePrivate: true,
    canPublishToGallery: true,
  },
  /**
   * Stub for a future Pro subscription. Values are placeholders so the shape
   * is stable; do not expose this plan in the UI yet.
   */
  pro: {
    patternsPerWeek: "unlimited",
    minColors: COLOR_LIMITS.min,
    maxColors: COLOR_LIMITS.max,
    maxGridWidth: GRID_LIMITS.maxWidth,
    maxGridHeight: GRID_LIMITS.maxHeight,
    pdfBranding: false,
    canSavePrivate: true,
    canPublishToGallery: true,
  },
  /** Future credit packs — not sold yet. */
  credits: {
    patternsPerWeek: 1,
    minColors: COLOR_LIMITS.min,
    maxColors: COLOR_LIMITS.max,
    maxGridWidth: GRID_LIMITS.maxWidth,
    maxGridHeight: GRID_LIMITS.maxHeight,
    pdfBranding: true,
    canSavePrivate: true,
    canPublishToGallery: true,
  },
  /** Future timed pass / “rental” — not sold yet. */
  rental: {
    patternsPerWeek: 1,
    minColors: COLOR_LIMITS.min,
    maxColors: COLOR_LIMITS.max,
    maxGridWidth: GRID_LIMITS.maxWidth,
    maxGridHeight: GRID_LIMITS.maxHeight,
    pdfBranding: true,
    canSavePrivate: true,
    canPublishToGallery: true,
  },
};

export const ACTIVE_PLAN_ID: PlanId = "free";
