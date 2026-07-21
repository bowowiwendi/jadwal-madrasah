"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Search,
  Users,
  ArrowLeft,
  CalendarDays,
} from "lucide-react";

import { SUBJECTS, DAYS, type SubjectKey } from "@/lib/subjects";
import { CLASS_ORDER, SCHEDULE } from "@/lib/data";
import {
  resolveSubjects,
  TEACHERS,
  teacherInitials,
  type Teacher,
} from "@/lib/teachers";

const GRADIENTS = [
  "from-indigo-500 to-purple-500",
  "from-sky-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-rose-500 to-pink-500",
  "from-amber-500 to-orange-500",
  "from-violet-500 to-fuchsia-500",
  "from-blue-500 to-indigo-500",
  "from-teal-500 to-green-500",
];

const shortClass = (cls: string) => cls.replace("KELAS ", "");

function TeacherCard({
  teacher,
  index,
  onClick,
}: {
  teacher: Teacher;
  index: number;
  onClick: () => void;
}) {
  const subjects = resolveSubjects(teacher);
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      onClick={onClick}
      className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-base font-bold text-white shadow-sm`}
        >
          {teacherInitials(teacher.name)}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-slate-800">
            {teacher.name}
          </h3>
          <p className="flex items-center gap-1 text-xs text-slate-400">
            <GraduationCap className="h-3.5 w-3.5" />
            {teacher.classes.length} Kelas
            {teacher.note ? ` · ${teacher.note}` : ""}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-1.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          <BookOpen className="h-3.5 w-3.5" />
          Mata Pelajaran
        </p>
        <div className="flex flex-wrap gap-1.5">
          {subjects.map((key: SubjectKey) => {
            const meta = SUBJECTS[key];
            return (
              <span
                key={key}
                title={meta.name}
                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${meta.badge}`}
              >
                {key}
              </span>
            );
          })}
        </div>
      </div>

      <div className="mt-4 border-t border-slate-100 pt-3">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Kelas Pengampu
        </p>
        <div className="flex flex-wrap gap-1.5">
          {teacher.classes.map((c) => (
            <span
              key={c}
              className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 ring-1 ring-inset ring-slate-200"
            >
              {c}
            </span>
          ))}
        </div>
        <p className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-500">
          <CalendarDays className="h-3.5 w-3.5" />
          Klik untuk lihat jadwal mengajar
        </p>
      </div>
    </motion.button>
  );
}

function TeacherSchedule({ teacher }: { teacher: Teacher }) {
  const subs = new Set(resolveSubjects(teacher));
  const teacherClassKeys = new Set(
    teacher.classes.flatMap((c) => {
      const key = `KELAS ${c}`;
      if (key in SCHEDULE) return [key];
      return CLASS_ORDER.filter((k) => k.replace("KELAS ", "").startsWith(c));
    })
  );
  const times = SCHEDULE["KELAS 3"]
    .filter((s) => !s.isBreak)
    .map((s) => s.time);

  const rows = times.map((time) => ({
    time,
    days: DAYS.map((day) => {
      const found: { cls: string; subj: SubjectKey }[] = [];
      for (const cls of CLASS_ORDER) {
        if (!teacherClassKeys.has(cls)) continue;
        const slot = SCHEDULE[cls].find((s) => s.time === time);
        if (!slot || slot.isBreak) continue;
        const subj = slot.cells[day];
        if (subj && subs.has(subj)) found.push({ cls, subj });
      }
      return found;
    }),
  }));

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="border-b border-slate-200 px-4 py-3 font-semibold">
                Waktu
              </th>
              {DAYS.map((d) => (
                <th
                  key={d}
                  className="border-b border-slate-200 px-3 py-3 font-semibold"
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r) => (
              <tr key={r.time} className="align-top">
                <td className="whitespace-nowrap px-4 py-2.5 text-xs font-semibold tabular-nums text-slate-500">
                  {r.time}
                </td>
                {r.days.map((cells, di) => (
                  <td key={di} className="px-3 py-2.5">
                    {cells.length === 0 ? (
                      <span className="text-slate-300">—</span>
                    ) : (
                      <div className="space-y-1">
                        {cells.map((c, ci) => (
                          <div
                            key={ci}
                            className="flex items-center gap-1.5 rounded-md bg-slate-50 px-1.5 py-1"
                          >
                            <span className="text-[10px] font-bold text-slate-400">
                              {shortClass(c.cls)}
                            </span>
                            <span
                              className={`inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-bold ${SUBJECTS[c.subj].badge}`}
                            >
                              {c.subj}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function TeacherList() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Teacher | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TEACHERS;
    return TEACHERS.filter((t) => {
      const inName = t.name.toLowerCase().includes(q);
      const inClass = t.classes.some((c) => c.toLowerCase().includes(q));
      const inSubject = resolveSubjects(t).some((s) =>
        s.toLowerCase().includes(q)
      );
      return inName || inClass || inSubject;
    });
  }, [query]);

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
            <Users className="h-5 w-5 text-indigo-600" />
            Daftar Guru &amp; Pengampu
          </h2>
          <p className="text-sm text-slate-500">
            {TEACHERS.length} tenaga pengajar · Tahun Ajaran 2026/2027
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama / mapel / kelas…"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {selected ? (
        <div>
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke daftar
          </button>
          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-base font-bold text-white">
              {teacherInitials(selected.name)}
            </div>
            <div>
              <h3 className="text-base font-bold text-indigo-900">
                Jadwal Mengajar — {selected.name}
              </h3>
              <p className="text-xs text-indigo-700">
                Senin s.d. Sabtu · klik kelas untuk melihat di tab Jadwal
                Pelajaran
              </p>
            </div>
          </div>
          <TeacherSchedule teacher={selected} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center text-sm text-slate-400">
          Tidak ada guru yang cocok dengan pencarian “{query}”.
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((t, i) => (
            <TeacherCard
              key={t.id}
              teacher={t}
              index={i}
              onClick={() => setSelected(t)}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
