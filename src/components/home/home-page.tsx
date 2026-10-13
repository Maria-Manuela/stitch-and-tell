/**
 * Home page content
 * -----------------
 * Handles: hero (tagline + two CTAs), the three-step “How it works” strip,
 *          and example pattern cards. All copy comes from next-intl.
 *
 * Does not handle: creating patterns — the primary button only routes to /create.
 */

import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { EXAMPLE_GRIDS, PatternPreview } from "@/components/home/pattern-preview";

export async function HomePage() {
  const t = await getTranslations("home");
  const brand = await getTranslations("brand");
  const a11y = await getTranslations("a11y");

  const steps = [
    { title: t("step1Title"), body: t("step1Body") },
    { title: t("step2Title"), body: t("step2Body") },
    { title: t("step3Title"), body: t("step3Body") },
  ];

  const examples = [
    {
      title: t("example1Title"),
      meta: t("example1Meta"),
      grid: EXAMPLE_GRIDS.flower,
    },
    {
      title: t("example2Title"),
      meta: t("example2Meta"),
      grid: EXAMPLE_GRIDS.house,
    },
    {
      title: t("example3Title"),
      meta: t("example3Meta"),
      grid: EXAMPLE_GRIDS.cat,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <section className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium tracking-wide text-accent uppercase">
          {t("heroEyebrow")}
        </p>
        <h1 className="mt-4 font-display text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.1] tracking-tight">
          {brand("tagline")}
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          {brand("taglineSecondary")}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/create">{t("ctaPrimary")}</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/gallery">{t("ctaSecondary")}</Link>
          </Button>
        </div>
      </section>

      <section className="mt-20" aria-labelledby="how-it-works">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="how-it-works" className="font-display text-3xl">
            {t("howTitle")}
          </h2>
          <p className="mt-2 text-muted-foreground">{t("howLead")}</p>
        </div>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-3xl border border-border bg-surface p-6"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                {index + 1}
              </span>
              <h3 className="mt-4 font-display text-xl">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20" aria-labelledby="examples">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="examples" className="font-display text-3xl">
            {t("examplesTitle")}
          </h2>
          <p className="mt-2 text-muted-foreground">{t("examplesLead")}</p>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map((example) => (
            <li
              key={example.title}
              className="flex flex-col gap-4 rounded-3xl border border-border bg-surface p-4"
            >
              <PatternPreview
                grid={example.grid.map((row) => [...row])}
                label={a11y("examplePattern")}
              />
              <div>
                <h3 className="font-display text-xl">{example.title}</h3>
                <p className="text-sm text-muted-foreground">{example.meta}</p>
                <p className="mt-2 text-xs text-muted">{t("exampleSoon")}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
