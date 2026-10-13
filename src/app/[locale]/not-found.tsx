/**
 * Locale-aware 404
 * ----------------
 * Handles: a calm empty state when a path under `/[locale]` does not exist.
 */

import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="font-display text-4xl">{t("title")}</h1>
      <p className="mt-4 text-muted-foreground">{t("body")}</p>
      <div className="mt-8">
        <Button asChild>
          <Link href="/">{t("home")}</Link>
        </Button>
      </div>
    </div>
  );
}
