import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/**
 * next-intl plugin
 * -----------------
 * Wires `src/i18n/request.ts` into the Next.js build so Server Components
 * can call `getTranslations()` / `getMessages()` without extra plumbing.
 */
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Keep the compiler honest; the pattern engine will live in /lib later.
  reactStrictMode: true,
  // The folder name contains `&`, and a lockfile on the parent Desktop can
  // confuse Turbopack. Pin the workspace root to this app.
  turbopack: {
    root: process.cwd(),
  },
};

export default withNextIntl(nextConfig);
