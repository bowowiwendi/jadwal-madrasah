"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Circle,
  Heart,
  Sparkles,
  Sun,
} from "lucide-react";

import { buildDays, JUZ_AMMA, SHOLAT_DOA } from "@/lib/routine";
import { useSettings } from "./SettingsContext";

export default function PembiasaanPagi() {
  const { settings, update, surahCurrent, surahTotal } = useSettings();
  const preReading = settings.preReading;

  const surahDays = useMemo(() => buildDays([...JUZ_AMMA].reverse()), []);
  const completedCount = surahCurrent;

  const activePre = preReading[surahCurrent % preReading.length];
  const surahProgress = Math.round((completedCount / surahTotal) * 100);
  const currentSurahs = surahDays[surahCurrent]?.surahs ?? [];

  return (
    <div className="space-y-5">
      {/* Intro */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-sm">
            <Sun className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Pembiasaan Pagi
            </h2>
            <p className="text-sm text-slate-500">
              Bacaan maju otomatis per hari. Klik rencana di bawah untuk
              mengatur ulang.
            </p>
          </div>
        </div>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-200">
          <Sparkles className="h-3.5 w-3.5" />
          Hari ke-{surahCurrent + 1} / {surahTotal}
        </span>
      </div>

      {/* Alternating Pre-Reading */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Bacaan Pembuka (Selang-seling)
        </p>
        <div className="flex flex-wrap gap-2">
          {preReading.map((label, i) => {
            const active = label === activePre;
            return (
              <div
                key={label}
                className={[
                  "flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all",
                  active
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700 shadow-sm"
                    : "border-slate-200 bg-slate-50 text-slate-400",
                ].join(" ")}
              >
                <span
                  className={[
                    "h-2 w-2 rounded-full",
                    active ? "bg-emerald-500" : "bg-slate-300",
                  ].join(" ")}
                />
                {label}
                {active && (
                  <span className="ml-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    HARI INI
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Surah tracker (auto-advance) */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-3">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
            <BookOpen className="h-4 w-4 text-emerald-600" />
            Bacaab Al-Qur'an (Juz &apos;Amma)
          </p>
          <span className="text-xs text-slate-400">
            Otomatis: {surahCurrent + 1} / {surahTotal}
          </span>
        </div>

        <div className="p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={surahCurrent}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex flex-wrap gap-2">
                {currentSurahs.map((s) => (
                  <div
                    key={s.no}
                    className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-bold text-white">
                      {s.no}
                    </span>
                    <span className="text-sm font-bold text-emerald-800">
                      {s.name}
                    </span>
                    {s.long && (
                      <span className="rounded-full bg-white px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600 ring-1 ring-emerald-200">
                        1 hari
                      </span>
                    )}
                  </div>
                ))}
              </div>
              {currentSurahs.length > 1 && (
                <p className="mt-2 text-xs text-slate-400">
                  Surah pendek digabung dalam 1 hari bacaan.
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-slate-500">
              <span>Progres Juz &apos;Amma</span>
              <span>{surahProgress}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                initial={false}
                animate={{ width: `${surahProgress}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Doa-doa dalam Sholat */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-3">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
            <Heart className="h-4 w-4 text-teal-600" />
            Doa-doa dalam Sholat
          </p>
          <span className="text-xs text-slate-400">
            Urutan dibaca: Takbiratul Ikhram → Tasyahud Akhir
          </span>
        </div>
        <ol className="divide-y divide-slate-100">
          {SHOLAT_DOA.map((doa, i) => (
            <li key={doa.name} className="px-5 py-4">
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-800">{doa.name}</p>
                  <p
                    dir="rtl"
                    className="mt-2 text-right text-lg leading-loose text-slate-900"
                  >
                    {doa.arabic}
                  </p>
                  <p className="mt-1 text-xs italic text-slate-500">
                    {doa.latin}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {doa.arti}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Full plan — clickable for admin */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-emerald-600" />
          <h3 className="text-sm font-bold text-slate-700">
            Rencana Bacaan Lengkap
          </h3>
          <span className="text-xs text-slate-400">(klik untuk atur ulang dari sini)</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {surahDays.map((day, i) => {
            const done = i < surahCurrent;
            const active = i === surahCurrent;
            return (
              <button
                key={i}
                type="button"
                onClick={() =>
                  update({
                    surahOffset: i,
                    surahStartDate: new Date().toISOString().slice(0, 10),
                  })
                }
                className={[
                  "flex items-start gap-2 rounded-xl border p-2.5 text-left transition-all",
                  active
                    ? "border-emerald-400 bg-emerald-50 ring-1 ring-emerald-300"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                ].join(" ")}
              >
                {done ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                ) : active ? (
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                ) : (
                  <Circle className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
                )}
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-slate-400">
                    Hari {i + 1}
                  </p>
                  <p className="line-clamp-2 text-xs font-semibold text-slate-700">
                    {day.surahs.map((s) => s.name).join(", ")}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
