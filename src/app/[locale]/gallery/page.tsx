/**
 * Route: `/[locale]/gallery`
 * Handles: empty public-gallery placeholder. Sharing will be opt-in later.
 */

import { getTranslations, setRequestLocale } from "next-intl/server";
import { SimplePage } from "@/components/placeholders/simple-page";
import { resolveLocale } from "@/i18n/locale";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "gallery" });
  return { title: t("title") };
}

export default async function Page({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("gallery");

  return (
    <SimplePage title={t("title")} lead={t("lead")}>
      <p>{t("empty")}</p>
    </SimplePage>
  );
}
