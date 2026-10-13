/**
 * Locale routing table
 * --------------------
 * Handles: which languages exist and how URLs look (`/en/...`, `/da/...`).
 *          Shared by the Next.js proxy, `createNavigation`, and request config.
 *
 * Does not handle: translating strings (that is `messages/*.json`) or storing
 * the visitor’s other preferences (that is `@/lib/user-settings`).
 */

import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "da"],
  defaultLocale: "en",
  // Always show the locale in the path so language is obvious and shareable.
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];
