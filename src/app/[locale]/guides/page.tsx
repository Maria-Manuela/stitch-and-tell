/**
 * Route: `/[locale]/guides`
 * Handles: “Guides coming soon”. Real guides wait until the tool is finished.
 */

import { getTranslations, setRequestLocale } from "next-intl/server";
import { SimplePage } from "@/components/placeholders/simple-page";
import { resolveLocale } from "@/i18n/locale";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "guides" });
  return { title: t("title") };
}

export default async function Page({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("guides");

  return (
    <SimplePage title={t("title")} lead={t("lead")}>
      <p>{t("body")}</p>
    </SimplePage>
  );
}
