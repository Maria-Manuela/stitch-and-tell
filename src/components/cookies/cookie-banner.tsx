/**
 * Cookie-consent banner
 * ---------------------
 * Handles: first-visit prompt and the “Cookie settings” re-open from the
 *          footer. Two actions only: necessary cookies, or necessary +
 *          analytics. Analytics remain off until the second choice.
 *
 * Does not handle: injecting a third-party analytics script. See
 * `trackEvent()` in `@/lib/cookie-consent`.
 */

"use client";

import { useTranslations } from "next-intl";
import { useCookieConsent } from "@/components/cookies/cookie-consent-context";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const t = useTranslations("cookies");
  const { bannerOpen, decide } = useCookieConsent();

  if (!bannerOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 p-4"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-body"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-3xl border border-border bg-surface p-5 shadow-[var(--shadow-soft)] md:flex-row md:items-end">
        <div className="flex-1 space-y-2">
          <h2 id="cookie-banner-title" className="font-display text-xl">
            {t("title")}
          </h2>
          <p id="cookie-banner-body" className="text-sm text-muted-foreground">
            {t("body")}
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              <span className="font-medium">{t("necessaryLabel")}: </span>
              {t("necessaryHelp")}
            </li>
            <li>
              <span className="font-medium">{t("analyticsLabel")}: </span>
              {t("analyticsHelp")}
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="secondary" onClick={() => decide("necessary")}>
            {t("necessary")}
          </Button>
          <Button onClick={() => decide("all")}>{t("accept")}</Button>
        </div>
      </div>
    </div>
  );
}
