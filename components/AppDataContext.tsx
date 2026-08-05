"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  DEFAULT_ADMIN_DATA,
  mergeAdminData,
  type AdminData,
} from "@/lib/adminData";

const STORAGE_KEY = "mijafa_admin_data_v1";
const API_URL = "/api/admin-data";

async function fetchData(): Promise<AdminData | null> {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) return null;
    return mergeAdminData(await res.json());
  } catch {
    return null;
  }
}

async function postData(d: AdminData): Promise<boolean> {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(d),
    });
    return true;
  } catch {
    return false;
  }
}

function loadLocal(): AdminData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return mergeAdminData(JSON.parse(raw));
  } catch {
    return null;
  }
}

function saveLocal(d: AdminData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
  } catch {
    /* abaikan */
  }
}

interface CtxValue {
  data: AdminData;
  /** true setelah data dimuat dari server / localStorage. */
  loaded: boolean;
  update: (patch: Partial<AdminData>) => void;
  reset: () => void;
}

const Ctx = createContext<CtxValue | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AdminData>(() =>
    structuredClone(DEFAULT_ADMIN_DATA)
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const fromApi = await fetchData();
      if (cancelled) return;
      setData(fromApi ?? loadLocal() ?? structuredClone(DEFAULT_ADMIN_DATA));
      setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    postData(data);
    saveLocal(data);
  }, [data, loaded]);

  const update = (patch: Partial<AdminData>) =>
    setData((prev) => ({ ...prev, ...patch }));

  const reset = () => setData(structuredClone(DEFAULT_ADMIN_DATA));

  return (
    <Ctx.Provider value={{ data, loaded, update, reset }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAppData(): CtxValue {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAppData harus dipakai dalam AppDataProvider");
  return c;
}
