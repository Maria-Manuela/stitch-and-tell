/**
 * next-intl TypeScript augmentation
 * ---------------------------------
 * Handles: typing `useTranslations('Home')` so keys autocomplete from en.json.
 *          next-intl looks for `AppConfig` on the `next-intl` module.
 */

import type { routing } from "@/i18n/routing";
import type messages from "../messages/en.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
