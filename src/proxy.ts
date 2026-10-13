/**
 * Next.js proxy (formerly middleware)
 * -----------------------------------
 * Handles: detecting / redirecting the locale prefix on every page request.
 *          Visiting `/` becomes `/en` (or `/da` from Accept-Language).
 *
 * Does not handle: auth, rate limits, or cookie-consent gating. Those belong
 * in route handlers later. Static files (`favicon.svg`, `/_next`) are skipped
 * by the matcher so we do not break CSS/JS.
 */

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
