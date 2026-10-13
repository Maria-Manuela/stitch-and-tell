/**
 * Locale-aware navigation helpers
 * -------------------------------
 * Handles: Link, router, pathname, and redirects that keep the `/[locale]`
 *          prefix. Use these instead of `next/link` and `next/navigation`
 *          anywhere a URL is built, or the visitor will lose their language.
 *
 * Does not handle: the proxy/middleware itself (`src/proxy.ts`).
 */

import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
