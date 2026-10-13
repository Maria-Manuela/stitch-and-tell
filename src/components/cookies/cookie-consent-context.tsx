/**
 * Cookie-consent context
 * ----------------------
 * Handles: whether the banner is visible, the saved choice, and opening the
 *          banner again from the footer (“Cookie settings”).
 *
 * Analytics start disabled. `hasAnalytics` is true only after “Accept
 * analytics”. Necessary cookies are never optional.
 */

"use client";

import * as React from "react";
import {
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentChoice,
  type CookieConsentState,
} from "@/lib/cookie-consent";

type CookieContextValue = {
  consent: CookieConsentState | null;
  bannerOpen: boolean;
  hasAnalytics: boolean;
  decide: (choice: CookieConsentChoice) => void;
  openBanner: () => void;
  closeBanner: () => void;
};

const CookieContext = React.createContext<CookieContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = React.useState<CookieConsentState | null>(null);
  const [bannerOpen, setBannerOpen] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    const stored = readCookieConsent();
    setConsent(stored);
    setBannerOpen(stored === null);
    setHydrated(true);
  }, []);

  const decide = React.useCallback((choice: CookieConsentChoice) => {
    setConsent(writeCookieConsent(choice));
    setBannerOpen(false);
  }, []);

  const value = React.useMemo(
    () => ({
      consent,
      bannerOpen: hydrated && bannerOpen,
      hasAnalytics: consent?.choice === "all",
      decide,
      openBanner: () => setBannerOpen(true),
      closeBanner: () => setBannerOpen(false),
    }),
    [consent, bannerOpen, hydrated, decide],
  );

  return <CookieContext.Provider value={value}>{children}</CookieContext.Provider>;
}

export function useCookieConsent() {
  const context = React.useContext(CookieContext);
  if (!context) {
    throw new Error("useCookieConsent must be used inside CookieConsentProvider");
  }
  return context;
}
