"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  CalendarClock,
  CalendarOff,
  LayoutDashboard,
  Sparkles,
  Sun,
} from "lucide-react";

import { CLASS_ORDER, SCHEDULE } from "@/lib/data";
import { DAYS, SUBJECTS, type SubjectKey } from "@/lib/subjects";
import { getIndonesianWeekday, getPasaran } from "@/lib/calendar";
import { getTodayRoutine, SHOLAT_DOA } from "@/lib/routine";
import { useSettings } from "./SettingsContext";
import {
  getTodayPiket,
  getTodayUniform,
  getTodayUpacara,
  getTodayKegiatanJumat,
} from "@/lib/school";
import SubjectCell from "./SubjectCell";

const YASIN = {
  arab: "بسمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ ۞ يٰسٓ ۞",
  latin: "Bismillāhir-raḥmānir-raḥīm. Yā Sīn.",
  arti: "Surat Yasin (36) — disunahkan membaca Surat Yasin pada hari Jum'at, lebih-lebih lagi pada Jum'at Kliwon.",
};

export default function DashboardHariIni() {
  const today = new Date();
  const weekday = getIndonesianWeekday(today);
  const pasaran = getPasaran(today);
  const isLibur = weekday === "Minggu";
  const isJumatKliwon = weekday === "Jumat" && pasaran === "Kliwon";
  const dayKey = (DAYS as readonly string[]).includes(weekday)
    ? (weekday as (typeof DAYS)[number])
    : null;

  const { settings } = useSettings();
  const routine = getTodayRoutine(settings.preReading, today);
  const piket = getTodayPiket(today);
  const uniform = getTodayUniform(today);
  const upacara = getTodayUpacara(today);
  const kegiatanJumat = getTodayKegiatanJumat(today);

  const dateLabel = today.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      {/* Header info */}
      <div className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-br from-slate-800 to-indigo-900 px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">Dashboard Hari Ini</h2>
              <p className="text-sm capitalize text-slate-200">{dateLabel}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold ring-1 ring-white/20">
              Hari: {weekday}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold ring-1 ring-white/20">
              Pasaran: {pasaran}
            </span>
          </div>
        </div>

        {isLibur && (
          <div className="flex items-center gap-3 px-5 py-4 text-slate-600">
            <CalendarOff className="h-5 w-5 text-slate-400" />
            <p className="text-sm font-medium">
              Hari ini Minggu — sekolah libur, tidak ada jadwal pelajaran.
            </p>
          </div>
        )}

        {isJumatKliwon && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-amber-200 bg-amber-50 px-5 py-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-sm font-bold text-amber-900">
                  <Sparkles className="h-4 w-4" />
                  Jum&apos;at Kliwon — Bacaan Tambahan: Surat Yasin
                </p>
                <p dir="rtl" className="mt-1 text-lg leading-relaxed text-amber-900">
                  {YASIN.arab}
                </p>
                <p className="text-sm font-medium text-amber-800">{YASIN.latin}</p>
                <p className="mt-1 text-xs text-amber-700">{YASIN.arti}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {!isLibur && dayKey && (
        <div className="mb-6 overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-sm">
          <div className="flex items-center gap-3 border-b border-emerald-100 bg-white/60 px-5 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white">
              <Sun className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-emerald-900">
                Pembiasaan Pagi Hari Ini
              </h3>
              <p className="text-xs text-emerald-700">
                Kegiatan sebelum pelajaran dimulai.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">
            {/* Bacaan pembuka */}
            <div className="rounded-xl border border-emerald-200 bg-white p-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-500">
                Bacaan Pembuka
              </p>
              <p className="flex items-center gap-2 text-sm font-bold text-emerald-800">
                {routine.preReading}
                <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
                  HARI INI
                </span>
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Selang-seling dengan Doa-doa dalam Sholat.
              </p>
            </div>

            {/* Baca Al-Qur'an */}
            <div className="rounded-xl border border-emerald-200 bg-white p-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-500">
                Baca Al-Qur'an (Juz 'Amma)
              </p>
              <div className="flex flex-wrap gap-1.5">
                {routine.surahs.map((s) => (
                  <span
                    key={s.no}
                    className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200"
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white">
                      {s.no}
                    </span>
                    {s.name}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Hari ke-{routine.index + 1} dari {routine.total} (mundur: An-Nas →
                An-Naba').
              </p>
            </div>

            {/* Doa-doa dalam Sholat */}
            <div className="rounded-xl border border-emerald-200 bg-white p-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-500">
                Doa-doa dalam Sholat
              </p>
              <p className="text-sm font-bold text-emerald-800">
                {SHOLAT_DOA.length} Doa
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Dibaca berurutan dari Takbiratul Ikhram hingga Tasyahud Akhir.
              </p>
            </div>
          </div>
        </div>
      )}

      {!isLibur && dayKey && (
        <div className="mb-6 overflow-hidden rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-slate-50 shadow-sm">
          <div className="flex items-center gap-3 border-b border-indigo-100 bg-white/60 px-5 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <CalendarClock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-indigo-900">Info Hari Ini</h3>
              <p className="text-xs text-indigo-700">
                Seragam, piket &amp; kegiatan hari ini.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
            <div className="rounded-xl border border-indigo-200 bg-white p-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-indigo-500">
                Seragam Hari Ini
              </p>
              <p className="text-sm font-bold text-indigo-800">{uniform}</p>
            </div>

            {piket && (
              <div className="rounded-xl border border-indigo-200 bg-white p-4">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-indigo-500">
                  Piket ({piket.Kelas})
                </p>
                <p className="text-xs text-slate-500">Sholat Duha &amp; Duhur</p>
                <p className="text-sm font-semibold text-indigo-800">
                  {piket["Sholat Duha dan Duhur"]}
                </p>
                <p className="mt-1.5 text-xs text-slate-500">Salam Sapa</p>
                <p className="text-sm font-semibold text-indigo-800">
                  {piket["Salam Sapa"]}
                </p>
              </div>
            )}

            {upacara && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 sm:col-span-2">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-amber-600">
                  Upacara Bendera Hari Ini
                </p>
                <p className="text-sm font-bold text-amber-900">
                  {upacara["Hari, Tanggal"]}
                </p>
                <p className="text-xs text-amber-800">
                  Petugas: {upacara.Petugas} · Pembina: {upacara.Pembina}
                </p>
              </div>
            )}

            {kegiatanJumat && (
              <div className="rounded-xl border border-teal-200 bg-teal-50 p-4 sm:col-span-2">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-teal-600">
                  Kegiatan Jum&apos;at
                </p>
                <p className="text-sm font-bold text-teal-800">{kegiatanJumat}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {!isLibur && dayKey && (
        <>
          <p className="mb-4 text-sm font-medium text-slate-500">
            Berikut jadwal pelajaran untuk seluruh kelas pada hari{" "}
            <span className="font-semibold text-slate-700">{weekday}</span>.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {CLASS_ORDER.map((kelas, idx) => {
              const slots = SCHEDULE[kelas];
              return (
                <motion.div
                  key={kelas}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.25 }}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="border-b border-slate-100 bg-slate-50 px-4 py-2.5">
                    <h3 className="text-sm font-bold text-slate-800">{kelas}</h3>
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {slots.map((slot, i) => {
                      if (slot.isBreak) {
                        return (
                          <li
                            key={i}
                            className="flex items-center justify-between px-4 py-2"
                          >
                            <span className="text-xs font-medium tabular-nums text-slate-400">
                              {slot.time}
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold italic text-slate-500">
                              Istirahat
                            </span>
                          </li>
                        );
                      }
                      const subject = slot.cells[dayKey];
                      return (
                        <li
                          key={i}
                          className="flex items-center justify-between gap-3 px-4 py-2"
                        >
                          <span className="text-xs font-medium tabular-nums text-slate-400">
                            {slot.time}
                          </span>
                          <div className="min-w-0 flex-1">
                            {subject ? (
                              <SubjectCell subject={subject as SubjectKey} highlight={null} />
                            ) : (
                              <div className="flex h-[40px] items-center justify-center rounded-lg border border-dashed border-slate-200 text-xs text-slate-300">
                                —
                              </div>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
