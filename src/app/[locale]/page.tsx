/**
 * Route: `/[locale]` (home)
 * Handles: composing the marketing home page. Metadata uses the home title.
 */

import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomePage } from "@/components/home/home-page";
import { resolveLocale } from "@/i18n/locale";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("homeTitle") };
}

export default async function Page({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  return <HomePage />;
}
