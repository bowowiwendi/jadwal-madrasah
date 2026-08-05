"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  Lock,
  School,
  Settings2,
  Users,
  X,
} from "lucide-react";

import { sha256Hex } from "@/lib/adminData";
import { useAppData } from "./AppDataContext";
import AdminInfoSection from "./admin/AdminInfoSection";
import AdminSekolahSection from "./admin/AdminSekolahSection";
import AdminGuruSection from "./admin/AdminGuruSection";
import AdminJadwalSection from "./admin/AdminJadwalSection";
import AdminRoutineSection from "./admin/AdminRoutineSection";

type TabKey = "info" | "sekolah" | "guru" | "jadwal" | "pembiasaan";

const TABS: { key: TabKey; label: string; icon: typeof School }[] = [
  { key: "info", label: "Info & Keamanan", icon: School },
  { key: "sekolah", label: "Data Sekolah", icon: ClipboardList },
  { key: "guru", label: "Guru", icon: Users },
  { key: "jadwal", label: "Jadwal Pelajaran", icon: CalendarDays },
  { key: "pembiasaan", label: "Pembiasaan", icon: BookOpen },
];

function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const { data } = useAppData();
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(false);
    try {
      const hash = await sha256Hex(pin);
      if (hash === data.pinHash) {
        onUnlock();
      } else {
        setError(true);
        setPin("");
      }
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm">
        <Lock className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-base font-bold text-slate-800">Panel Terkunci</h3>
      <p className="mt-1 text-sm text-slate-500">
        Masukkan PIN admin untuk membuka pengaturan.
      </p>
      <form onSubmit={submit} className="mt-5 w-full max-w-xs">
        <input
          type="password"
          autoFocus
          value={pin}
          onChange={(e) => {
            setPin(e.target.value);
            setError(false);
          }}
          placeholder="PIN admin…"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-lg tracking-[0.4em] text-slate-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
        {error && (
          <p className="mt-2 text-center text-xs font-semibold text-rose-500">
            PIN salah. Coba lagi.
          </p>
        )}
        <button
          type="submit"
          disabled={busy || !pin}
          className="mt-3 w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50"
        >
          {busy ? "Memeriksa…" : "Buka Panel"}
        </button>
      </form>
    </div>
  );
}

export default function AdminPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { data } = useAppData();
  const [tab, setTab] = useState<TabKey>("info");
  const [unlocked, setUnlocked] = useState(false);

  const locked = !!data.pinHash && !unlocked;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl sm:rounded-2xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-800">
                <Settings2 className="h-5 w-5 text-indigo-600" />
                Pengaturan Admin
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Tutup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {locked ? (
              <PinGate onUnlock={() => setUnlocked(true)} />
            ) : (
              <>
                <div className="flex gap-1 overflow-x-auto border-b border-slate-100 px-4 pt-2">
                  {TABS.map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setTab(key)}
                      className={[
                        "inline-flex shrink-0 items-center gap-1.5 rounded-t-lg border-b-2 px-3 py-2.5 text-sm font-semibold transition",
                        tab === key
                          ? "border-indigo-600 text-indigo-700"
                          : "border-transparent text-slate-500 hover:text-slate-700",
                      ].join(" ")}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </button>
                  ))}
                </div>

                <div className="overflow-y-auto px-5 py-5">
                  {tab === "info" && <AdminInfoSection />}
                  {tab === "sekolah" && <AdminSekolahSection />}
                  {tab === "guru" && <AdminGuruSection />}
                  {tab === "jadwal" && <AdminJadwalSection />}
                  {tab === "pembiasaan" && <AdminRoutineSection />}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
