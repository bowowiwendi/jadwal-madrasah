"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface AppSettings {
  /** Daftar bacaan pembuka yang diputar selang-seling (Pembiasaan Pagi). */
  preReading: string[];
  /** Hari ke-berapa (index 0) pembacaan Juz 'Amma yang sedang aktif. */
  surahCurrent: number;
  /** Daftar hari (index) Juz 'Amma yang sudah ditandai selesai. */
  surahCompleted: number[];
}

const KEY = "mijafa_settings_v1";

export const DEFAULT_SETTINGS: AppSettings = {
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

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const data = JSON.parse(raw) as Partial<AppSettings>;
        setSettings({
          preReading:
            Array.isArray(data.preReading) && data.preReading.length > 0
              ? data.preReading
              : DEFAULT_SETTINGS.preReading,
          surahCurrent:
            typeof data.surahCurrent === "number" ? data.surahCurrent : 0,
          surahCompleted: Array.isArray(data.surahCompleted)
            ? data.surahCompleted
            : [],
        });
      }
    } catch {
      /* abaikan jika gagal membaca penyimpanan */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(settings));
    } catch {
      /* abaikan jika gagal menyimpan */
    }
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
