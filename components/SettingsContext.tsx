"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface AppSettings {
  preReading: string[];
  surahCurrent: number;
  surahCompleted: number[];
}

const DEFAULT_SETTINGS: AppSettings = {
  preReading: ["Asmaul Husna", "Doa-doa dalam Sholat"],
  surahCurrent: 0,
  surahCompleted: [],
};

interface CtxValue {
  settings: AppSettings;
  update: (patch: Partial<AppSettings>) => void;
  resetSurah: () => void;
  hydrated: boolean;
}

const Ctx = createContext<CtxValue | null>(null);

const STORAGE_KEY = "mijafa_settings_v1";

async function fetchSettings(): Promise<AppSettings | null> {
  try {
    const res = await fetch("/api/admin-settings");
    if (!res.ok) return null;
    const data = await res.json();
    if (data && typeof data === "object") return data as AppSettings;
    return null;
  } catch {
    return null;
  }
}

async function postSettings(s: AppSettings): Promise<boolean> {
  try {
    const res = await fetch("/api/admin-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(s),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function loadLocal(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw) as Partial<AppSettings>;
      return {
        preReading:
          Array.isArray(data.preReading) && data.preReading.length > 0
            ? data.preReading
            : DEFAULT_SETTINGS.preReading,
        surahCurrent:
          typeof data.surahCurrent === "number"
            ? data.surahCurrent
            : DEFAULT_SETTINGS.surahCurrent,
        surahCompleted: Array.isArray(data.surahCompleted)
          ? data.surahCompleted
          : DEFAULT_SETTINGS.surahCompleted,
      };
    }
  } catch {
    /* abaikan */
  }
  return DEFAULT_SETTINGS;
}

function saveLocal(s: AppSettings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* abaikan */
  }
}

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);

  const load = async () => {
    const fromApi = await fetchSettings();
    if (fromApi) {
      setSettings(fromApi);
    } else {
      // Fallback: localStorage
      setSettings(loadLocal());
    }
    setHydrated(true);
  };

  useEffect(() => {
    load();
  }, []);

  // Persist ke API & localStorage setiap perubahan
  useEffect(() => {
    if (!hydrated) return;
    postSettings(settings);
    saveLocal(settings);
  }, [settings, hydrated]);

  const update: CtxValue["update"] = (patch) =>
    setSettings((s) => ({ ...s, ...patch }));

  const resetSurah = () =>
    setSettings((s) => ({ ...s, surahCurrent: 0, surahCompleted: [] }));

  return (
    <Ctx.Provider value={{ settings, update, resetSurah, hydrated }}>
      {children}
    </Ctx.Provider>
  );
}

export function useSettings(): CtxValue {
  const c = useContext(Ctx);
  if (!c)
    throw new Error("useSettings harus dipakai dalam AppSettingsProvider");
  return c;
}
