/**
 * Create entry page
 * -----------------
 * Handles: the two large starting choices (“From a photo” / “Design your
 *          own”). They are placeholders — not wired to a converter yet.
 *
 * Does not handle: uploads, colour reduction, or the design canvas.
 */

import { Camera, Pencil } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function CreatePage() {
  const t = await getTranslations("create");

  const choices = [
    {
      icon: Camera,
      title: t("fromPhotoTitle"),
      body: t("fromPhotoBody"),
      hint: t("fromPhotoHint"),
    },
    {
      icon: Pencil,
      title: t("designTitle"),
      body: t("designBody"),
      hint: t("designHint"),
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{t("lead")}</p>
      </header>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {choices.map((choice) => (
          <div
            key={choice.title}
            className="flex min-h-64 flex-col rounded-3xl border border-border bg-surface p-8 text-left"
          >
            <choice.icon
              aria-hidden="true"
              className="size-8 text-accent"
              strokeWidth={1.5}
            />
            <h2 className="mt-6 font-display text-2xl">{choice.title}</h2>
            <p className="mt-3 flex-1 text-muted-foreground">{choice.body}</p>
            <p className="mt-6 text-sm font-medium text-accent">{choice.hint}</p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
        {t("note")}
      </p>
    </div>
  );
}
