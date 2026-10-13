/**
 * Guest user settings (localStorage)
 * ----------------------------------
 * Handles: the four global preferences from the master context — language,
 *          handedness, stitch terminology, and units. Logged-in profiles will
 *          later sync the same object to Supabase; for now guests persist here.
 *
 * Does not handle: actually mirroring the chart for left-handed makers (the
 * pattern engine will read `handedness` later). Changing handedness must never
 * mutate pattern data, only how it is displayed.
 */

import type { AppLocale } from "@/i18n/routing";

export const SETTINGS_STORAGE_KEY = "stitch-and-tell:settings";

export const HANDEDNESS_OPTIONS = ["right", "left"] as const;
export const TERMINOLOGY_OPTIONS = ["us", "uk", "da"] as const;
export const UNIT_OPTIONS = ["cm", "in"] as const;

export type Handedness = (typeof HANDEDNESS_OPTIONS)[number];
export type Terminology = (typeof TERMINOLOGY_OPTIONS)[number];
export type Units = (typeof UNIT_OPTIONS)[number];

export type UserSettings = {
  language: AppLocale;
  handedness: Handedness;
  terminology: Terminology;
  units: Units;
};

export const DEFAULT_USER_SETTINGS: UserSettings = {
  language: "en",
  handedness: "right",
  terminology: "us",
  units: "cm",
};

function isHandedness(value: unknown): value is Handedness {
  return HANDEDNESS_OPTIONS.includes(value as Handedness);
}

function isTerminology(value: unknown): value is Terminology {
  return TERMINOLOGY_OPTIONS.includes(value as Terminology);
}

function isUnits(value: unknown): value is Units {
  return UNIT_OPTIONS.includes(value as Units);
}

function isLocale(value: unknown): value is AppLocale {
  return value === "en" || value === "da";
}

export function parseUserSettings(raw: unknown): UserSettings {
  if (!raw || typeof raw !== "object") {
    return DEFAULT_USER_SETTINGS;
  }

  const candidate = raw as Partial<UserSettings>;

  return {
    language: isLocale(candidate.language)
      ? candidate.language
      : DEFAULT_USER_SETTINGS.language,
    handedness: isHandedness(candidate.handedness)
      ? candidate.handedness
      : DEFAULT_USER_SETTINGS.handedness,
    terminology: isTerminology(candidate.terminology)
      ? candidate.terminology
      : DEFAULT_USER_SETTINGS.terminology,
    units: isUnits(candidate.units) ? candidate.units : DEFAULT_USER_SETTINGS.units,
  };
}

export function readStoredSettings(): UserSettings {
  if (typeof window === "undefined") {
    return DEFAULT_USER_SETTINGS;
  }

  try {
    const stored = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    return stored ? parseUserSettings(JSON.parse(stored)) : DEFAULT_USER_SETTINGS;
  } catch {
    return DEFAULT_USER_SETTINGS;
  }
}

export function writeStoredSettings(settings: UserSettings) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}
