/**
 * Route: `/[locale]/create`
 * Handles: the pattern-making doorway (photo vs. design). Converter not built.
 */

import { getTranslations, setRequestLocale } from "next-intl/server";
import { CreatePage } from "@/components/create/create-page";
import { resolveLocale } from "@/i18n/locale";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "create" });
  return { title: t("title") };
}

export default async function Page({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  return <CreatePage />;
}
