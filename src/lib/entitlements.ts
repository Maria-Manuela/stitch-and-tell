/**
 * Entitlements helper
 * -------------------
 * Handles: turning a (future) user record into the limits they may use.
 *          Guests and signed-in free users currently share the Free plan.
 *
 * Does not handle: counting how many patterns they already saved this week
 * (needs the database). Always re-check entitlements on the server before
 * saving or generating — never trust the browser alone.
 */

import { ACTIVE_PLAN_ID, PLANS, type Entitlements, type PlanId } from "@/config/plans";

/** Minimal shape we will fill in once Supabase Auth is wired up. */
export type EntitlementUser = {
  id: string;
  planId?: PlanId;
} | null;

export function getEntitlements(user: EntitlementUser): Entitlements {
  const planId = user?.planId ?? ACTIVE_PLAN_ID;
  return PLANS[planId] ?? PLANS.free;
}
