/**
 * App chrome
 * ----------
 * Handles: skip-link, sticky header, main landmark, footer, and the cookie
 *          banner sitting above everything else. Used once in the locale layout.
 *
 * Does not handle: page content — that is `children` from each route.
 */

import { useTranslations } from "next-intl";
import { CookieBanner } from "@/components/cookies/cookie-banner";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations("nav");

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        {t("skipToContent")}
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
