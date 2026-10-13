/**
 * Site footer
 * -----------
 * Handles: secondary links (legal + account), a second language switch, and
 *          a control that re-opens the cookie banner.
 *
 * Does not handle: the banner UI itself (CookieBanner).
 */

"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitch } from "@/components/i18n/language-switch";
import { useCookieConsent } from "@/components/cookies/cookie-consent-context";

const LINKS = [
  { href: "/create" as const, key: "create" as const },
  { href: "/gallery" as const, key: "gallery" as const },
  { href: "/guides" as const, key: "guides" as const },
  { href: "/account" as const, key: "account" as const },
  { href: "/privacy" as const, key: "privacy" as const },
  { href: "/terms" as const, key: "terms" as const },
];

export function Footer() {
  const t = useTranslations("footer");
  const brand = useTranslations("brand");
  const { openBanner } = useCookieConsent();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-2">
            <p className="font-display text-xl">{brand("name")}</p>
            <p className="text-sm text-muted-foreground">{t("tagline")}</p>
          </div>
          <nav aria-label={t("account")}>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-accent">
                    {t(item.key)}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="text-left hover:text-accent"
                  onClick={openBanner}
                >
                  {t("cookies")}
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">{t("copyright", { year })}</p>
          <LanguageSwitch compact />
        </div>
      </div>
    </footer>
  );
}
