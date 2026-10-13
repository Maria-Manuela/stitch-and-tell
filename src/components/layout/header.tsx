/**
 * Site header
 * -----------
 * Handles: wordmark, primary nav (Create / Gallery / Guides), compact
 *          language switch, settings drawer trigger, and a mobile menu.
 *
 * Does not handle: the settings fields themselves (SettingsSheet) or footer
 * links. `aria-current="page"` marks the active route for screen readers.
 */

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitch } from "@/components/i18n/language-switch";
import { SettingsSheet } from "@/components/settings/settings-sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/create" as const, key: "create" as const },
  { href: "/gallery" as const, key: "gallery" as const },
  { href: "/guides" as const, key: "guides" as const },
];

export function Header() {
  const t = useTranslations("nav");
  const brand = useTranslations("brand");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex min-h-[var(--header-height)] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-foreground sm:text-2xl"
        >
          {brand("name")}
        </Link>

        <nav aria-label={t("primary")} className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const current = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium",
                  current
                    ? "bg-accent-soft text-foreground"
                    : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <div className="hidden sm:block">
            <LanguageSwitch compact />
          </div>
          <SettingsSheet />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </Button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label={t("primary")}
          className="border-t border-border px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block min-h-11 rounded-xl px-3 py-3 text-base"
                  onClick={() => setOpen(false)}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 sm:hidden">
            <LanguageSwitch />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
