/**
 * Route: `/[locale]/terms`
 * Handles: placeholder terms of use. To be reviewed before launch.
 */

import { getTranslations, setRequestLocale } from "next-intl/server";
import { SimplePage } from "@/components/placeholders/simple-page";
import { resolveLocale } from "@/i18n/locale";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "terms" });
  return { title: t("title") };
}

export default async function Page({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("terms");

  return (
    <SimplePage title={t("title")} lead={t("lead")}>
      <section>
        <h2 className="font-display text-2xl text-foreground">{t("s1Title")}</h2>
        <p className="mt-2">{t("s1Body")}</p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-foreground">{t("s2Title")}</h2>
        <p className="mt-2">{t("s2Body")}</p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-foreground">{t("s3Title")}</h2>
        <p className="mt-2">{t("s3Body")}</p>
      </section>
    </SimplePage>
  );
}
