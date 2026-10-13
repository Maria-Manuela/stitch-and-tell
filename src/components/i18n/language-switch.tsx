/**
 * Language switch (EN / DA)
 * -------------------------
 * Handles: toggling the interface locale. Uses next-intl’s router so the
 *          current path is rewritten (`/en/create` → `/da/create`) and the
 *          `NEXT_LOCALE` cookie is updated. Also writes `language` into the
 *          guest settings object.
 *
 * Does not handle: stitch terminology (US/UK/Dansk) — that is a separate
 * setting because a Danish speaker may still want US terms, and vice versa.
 */

"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useSettings } from "@/components/settings/settings-context";

export function LanguageSwitch({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { updateSettings } = useSettings();

  function switchTo(next: AppLocale) {
    if (next === locale) {
      return;
    }
    updateSettings({ language: next });
    router.replace(pathname, { locale: next });
  }

  return (
    <div
      className={cn(
        "inline-flex rounded-full bg-surface-2 p-1 ring-1 ring-border",
        className,
      )}
      role="group"
      aria-label={t("switchTo")}
    >
      {routing.locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchTo(code)}
            aria-pressed={active}
            className={cn(
              "min-h-9 min-w-11 rounded-full px-3 text-sm font-medium transition-colors",
              active
                ? "bg-surface text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {compact ? code.toUpperCase() : t(code)}
          </button>
        );
      })}
    </div>
  );
}
