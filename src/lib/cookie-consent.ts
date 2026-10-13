/**
 * Cookie-consent storage
 * ----------------------
 * Handles: remembering whether the visitor accepted analytics. Necessary
 *          cookies (locale, settings) are always on — we do not offer a way
 *          to turn those off because the app cannot run without them.
 *
 * Does not handle: loading Google Analytics / Plausible. `trackEvent()` is a
 * stub that no-ops until a real provider is added AND consent is `all`.
 */

export const COOKIE_CONSENT_KEY = "stitch-and-tell:cookie-consent";

export type CookieConsentChoice = "necessary" | "all";

export type CookieConsentState = {
  choice: CookieConsentChoice;
  decidedAt: string;
};

export function readCookieConsent(): CookieConsentState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) {
      return null;
    }
    const parsed = JSON.parse(stored) as Partial<CookieConsentState>;
    if (parsed.choice === "necessary" || parsed.choice === "all") {
      return {
        choice: parsed.choice,
        decidedAt: parsed.decidedAt ?? new Date().toISOString(),
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function writeCookieConsent(choice: CookieConsentChoice) {
  const state: CookieConsentState = {
    choice,
    decidedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(state));
  return state;
}

/** Safe to call anywhere; does nothing unless analytics were accepted. */
export function trackEvent(name: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") {
    return;
  }

  const consent = readCookieConsent();
  if (consent?.choice !== "all") {
    return;
  }

  // Placeholder: swap this for Plausible / GA once a provider is chosen.
  window.dispatchEvent(
    new CustomEvent("stitch-and-tell:analytics", { detail: { name, payload } }),
  );
}
