/**
 * Settings drawer
 * ---------------
 * Handles: the four global preferences (language, handedness, terminology,
 *          units) in an accessible dialog. Each group is a fieldset of radio
 *          buttons. Changes persist immediately via SettingsProvider.
 *
 * Does not handle: account sync (that needs Auth). Handedness does not rewrite
 * pattern data — it will only flip how charts are labelled later.
 */

"use client";

import { useLocale, useTranslations } from "next-intl";
import { Settings } from "lucide-react";
import { LanguageSwitch } from "@/components/i18n/language-switch";
import { useSettings } from "@/components/settings/settings-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetCloseButton,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  HANDEDNESS_OPTIONS,
  TERMINOLOGY_OPTIONS,
  UNIT_OPTIONS,
  type Handedness,
  type Terminology,
  type Units,
} from "@/lib/user-settings";
import { cn } from "@/lib/utils";

type Option<T extends string> = { value: T; label: string };

function ChoiceGroup<T extends string>({
  legend,
  help,
  name,
  value,
  options,
  onChange,
}: {
  legend: string;
  help: string;
  name: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold">{legend}</legend>
      <p className="text-sm text-muted-foreground">{help}</p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          const checked = option.value === value;
          return (
            <label
              key={option.value}
              htmlFor={id}
              className={cn(
                "flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border px-4 text-sm",
                checked
                  ? "border-accent bg-accent-soft"
                  : "border-border bg-surface hover:bg-surface-2",
              )}
            >
              <input
                id={id}
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="size-4 accent-[var(--accent)]"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function SettingsSheet() {
  const t = useTranslations("settings");
  const headerT = useTranslations("header");
  const locale = useLocale();
  const { settings, updateSettings } = useSettings();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={headerT("openSettings")}
        >
          <Settings aria-hidden="true" className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent aria-describedby={undefined}>
        <SheetCloseButton label={t("close")} />
        <SheetHeader>
          <SheetTitle>{t("title")}</SheetTitle>
          <SheetDescription>{t("description")}</SheetDescription>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-6 py-4">
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold">{t("language")}</legend>
            <p className="text-sm text-muted-foreground">{t("languageHelp")}</p>
            <LanguageSwitch />
            <p className="text-xs text-muted">
              {locale.toUpperCase()} · {t("savedLocally")}
            </p>
          </fieldset>

          <ChoiceGroup
            legend={t("handedness")}
            help={t("handednessHelp")}
            name="handedness"
            value={settings.handedness}
            onChange={(handedness: Handedness) => updateSettings({ handedness })}
            options={HANDEDNESS_OPTIONS.map((value) => ({
              value,
              label:
                value === "right" ? t("handednessRight") : t("handednessLeft"),
            }))}
          />

          <ChoiceGroup
            legend={t("terminology")}
            help={t("terminologyHelp")}
            name="terminology"
            value={settings.terminology}
            onChange={(terminology: Terminology) =>
              updateSettings({ terminology })
            }
            options={TERMINOLOGY_OPTIONS.map((value) => ({
              value,
              label:
                value === "us"
                  ? t("terminologyUs")
                  : value === "uk"
                    ? t("terminologyUk")
                    : t("terminologyDa"),
            }))}
          />

          <ChoiceGroup
            legend={t("units")}
            help={t("unitsHelp")}
            name="units"
            value={settings.units}
            onChange={(units: Units) => updateSettings({ units })}
            options={UNIT_OPTIONS.map((value) => ({
              value,
              label: value === "cm" ? t("unitsCm") : t("unitsIn"),
            }))}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
