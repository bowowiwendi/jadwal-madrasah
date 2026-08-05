"use client";

import { ArrowDown, ArrowUp, BookOpen, GripVertical, Plus, Trash2 } from "lucide-react";

import { SURAH_DAYS } from "@/lib/routine";
import { useSettings } from "../SettingsContext";

export default function AdminRoutineSection() {
  const { settings, update, surahCurrent, surahTotal } = useSettings();
  const preReading = settings.preReading;

  const currentSurahs = SURAH_DAYS[surahCurrent]?.surahs ?? [];

  const setItem = (i: number, val: string) => {
    const next = [...preReading];
    next[i] = val;
    update({ preReading: next });
  };
  const removeItem = (i: number) =>
    update({ preReading: preReading.filter((_, j) => j !== i) });
  const addItem = () => update({ preReading: [...preReading, "Item Baru"] });
  const move = (i: number, dir: number) => {
    const j = i + dir;
    if (j < 0 || j >= preReading.length) return;
    const next = [...preReading];
    [next[i], next[j]] = [next[j], next[i]];
    update({ preReading: next });
  };

  const goToDay = (n: number) => {
    const clamped = Math.max(0, Math.min(surahTotal - 1, n));
    update({
      surahOffset: clamped,
      surahStartDate: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="mb-1 flex items-center gap-1.5 text-sm font-bold text-slate-700">
          <BookOpen className="h-4 w-4 text-emerald-600" />
          Bacaan Pembuka (Selang-seling)
        </p>
        <p className="mb-3 text-xs text-slate-400">
          Atur urutan bacaan yang diputar setiap hari secara bergiliran.
        </p>
        <div className="space-y-2">
          {preReading.map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 shrink-0 text-slate-300" />
              <input
                value={label}
                onChange={(e) => setItem(i, e.target.value)}
                className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 disabled:opacity-30"
                aria-label="Atas"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === preReading.length - 1}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 disabled:opacity-30"
                aria-label="Bawah"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="rounded-lg p-1.5 text-rose-500 transition hover:bg-rose-50"
                aria-label="Hapus"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addItem}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm font-semibold text-slate-500 transition hover:border-indigo-400 hover:text-indigo-600"
        >
          <Plus className="h-4 w-4" />
          Tambah Bacaan
        </button>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="mb-1 text-sm font-bold text-slate-700">
          Progres Surat (Juz &apos;Amma)
        </p>
        <p className="mb-3 text-xs text-slate-400">
          Atur posisi awal. Besok akan maju otomatis ke hari berikutnya.
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => goToDay(surahCurrent - 1)}
            disabled={surahCurrent === 0}
            className="rounded-lg bg-slate-100 px-3 py-2 text-lg font-bold text-slate-600 transition hover:bg-slate-200 disabled:opacity-40"
          >
            −
          </button>
          <div className="min-w-0 flex-1 text-center">
            <p className="text-2xl font-extrabold text-slate-800">
              {surahCurrent + 1}
              <span className="text-sm font-medium text-slate-400">
                {" "}
                / {surahTotal}
              </span>
            </p>
            <p className="line-clamp-1 text-xs text-slate-500">
              {currentSurahs.map((s) => s.name).join(", ")}
            </p>
          </div>
          <button
            type="button"
            onClick={() => goToDay(surahCurrent + 1)}
            disabled={surahCurrent >= surahTotal - 1}
            className="rounded-lg bg-slate-100 px-3 py-2 text-lg font-bold text-slate-600 transition hover:bg-slate-200 disabled:opacity-40"
          >
            +
          </button>
        </div>
      </section>
    </div>
  );
}
