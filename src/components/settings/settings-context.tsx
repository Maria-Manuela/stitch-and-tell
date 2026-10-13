/**
 * Settings context
 * ----------------
 * Handles: holding the four guest preferences in React state, hydrating them
 *          from localStorage, and writing them back on every change.
 *
 * Language is special: the URL (`/en` vs `/da`) is the source of truth for
 * the interface language. We still store it so a later account sync has one
 * object to upload.
 *
 * Does not handle: the settings UI (SettingsSheet) or locale routing
 * (`useRouter` in the language switch).
 */

"use client";

import * as React from "react";
import {
  DEFAULT_USER_SETTINGS,
  readStoredSettings,
  writeStoredSettings,
  type UserSettings,
} from "@/lib/user-settings";

type SettingsContextValue = {
  settings: UserSettings;
  updateSettings: (patch: Partial<UserSettings>) => void;
  ready: boolean;
};

const SettingsContext = React.createContext<SettingsContextValue | null>(null);

export function SettingsProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: UserSettings["language"];
}) {
  const [settings, setSettings] = React.useState<UserSettings>({
    ...DEFAULT_USER_SETTINGS,
    language: locale,
  });
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const stored = readStoredSettings();
    setSettings({ ...stored, language: locale });
    setReady(true);
  }, [locale]);

  const updateSettings = React.useCallback(
    (patch: Partial<UserSettings>) => {
      setSettings((current) => {
        const next = { ...current, ...patch };
        writeStoredSettings(next);
        return next;
      });
    },
    [],
  );

  const value = React.useMemo(
    () => ({ settings, updateSettings, ready }),
    [settings, updateSettings, ready],
  );

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = React.useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }
  return context;
}
