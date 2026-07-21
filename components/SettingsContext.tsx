"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { buildDays, JUZ_AMMA } from "@/lib/routine";

export interface AppSettings {
  preReading: string[];
  /** Index hari (0-based) saat `surahStartDate`. */
  surahOffset: number;
  /** Tanggal (ISO YYYY-MM-DD) saat `surahOffset` terakhir diatur. */
  surahStartDate: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  preReading: ["Asmaul Husna", "Doa-doa dalam Sholat"],
  surahOffset: 0,
  surahStartDate: new Date().toISOString().slice(0, 10),
};

interface CtxValue {
  settings: AppSettings;
  update: (patch: Partial<AppSettings>) => void;
  /** Index Juz 'Amma hari ini (dihitung otomatis dari offset + selisih hari). */
  surahCurrent: number;
  /** Total hari dalam siklus Juz 'Amma. */
  surahTotal: number;
  hydrated: boolean;
}

const Ctx = createContext<CtxValue | null>(null);

const STORAGE_KEY = "mijafa_settings_v1";

function daysSince(dateStr: string, today: Date): number {
  const start = new Date(dateStr + "T00:00:00");
  if (isNaN(start.getTime())) return 0;
  return Math.floor(
    (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
}

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
    await fetch("/api/admin-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(s),
    });
    return true;
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
        surahOffset:
          typeof data.surahOffset === "number"
            ? data.surahOffset
            : DEFAULT_SETTINGS.surahOffset,
        surahStartDate:
          typeof data.surahStartDate === "string" && data.surahStartDate
            ? data.surahStartDate
            : DEFAULT_SETTINGS.surahStartDate,
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

  const surahTotal = useMemo(
    () => buildDays([...JUZ_AMMA].reverse()).length,
    []
  );

  const surahCurrent = useMemo(() => {
    const today = new Date();
    const diff = daysSince(settings.surahStartDate, today);
    return (settings.surahOffset + diff) % surahTotal;
  }, [settings.surahOffset, settings.surahStartDate, surahTotal]);

  const load = async () => {
    const fromApi = await fetchSettings();
    if (fromApi) {
      setSettings(fromApi);
    } else {
      setSettings(loadLocal());
    }
    setHydrated(true);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    postSettings(settings);
    saveLocal(settings);
  }, [settings, hydrated]);

  const update: CtxValue["update"] = (patch) =>
    setSettings((s) => ({ ...s, ...patch }));

  return (
    <Ctx.Provider
      value={{ settings, update, surahCurrent, surahTotal, hydrated }}
    >
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

export { daysSince };
