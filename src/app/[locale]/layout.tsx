/**
 * Locale layout (root chrome for every page)
 * -----------------------------------------
 * Handles: validating `[locale]`, setting `<html lang>`, loading messages,
 *          fonts, and wrapping the tree with i18n + settings + cookie
 *          providers and the Header/Footer shell.
 *
 * Does not handle: individual routes — those are sibling `page.tsx` files.
 */

import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { CookieConsentProvider } from "@/components/cookies/cookie-consent-context";
import { SiteShell } from "@/components/layout/site-shell";
import { SettingsProvider } from "@/components/settings/settings-context";
import { resolveLocale } from "@/i18n/locale";
import { routing } from "@/i18n/routing";
import "../globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: {
      default: t("title"),
      template: `%s · ${t("title")}`,
    },
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = await resolveLocale(params);

  // Lets next-intl render this tree statically per locale.
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SettingsProvider locale={locale}>
            <CookieConsentProvider>
              <SiteShell>{children}</SiteShell>
            </CookieConsentProvider>
          </SettingsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
