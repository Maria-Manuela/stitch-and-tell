/**
 * Locale param helper
 * -------------------
 * Handles: turning Next.js’s `params.locale` (typed as `string`) into a real
 *          `AppLocale` (`"en" | "da"`). Invalid values 404.
 *
 * Used by every route so `setRequestLocale` and `getTranslations({ locale })`
 * stay type-safe.
 */

import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

export async function resolveLocale(
  params: Promise<{ locale: string }>,
): Promise<AppLocale> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return locale;
}
