/**
 * Route: `/[locale]/account`
 * Handles: placeholder for magic-link / OTP auth, data export and deletion.
 * Does not handle: Supabase Auth (not wired in the shell).
 */

import { getTranslations, setRequestLocale } from "next-intl/server";
import { SimplePage } from "@/components/placeholders/simple-page";
import { resolveLocale } from "@/i18n/locale";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "account" });
  return { title: t("title") };
}

export default async function Page({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("account");

  return (
    <SimplePage title={t("title")} lead={t("lead")}>
      <p>{t("body")}</p>
      <p>{t("privacyNote")}</p>
    </SimplePage>
  );
}
