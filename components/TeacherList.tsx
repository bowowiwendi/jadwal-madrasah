"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Search, Users } from "lucide-react";

import { SUBJECTS, type SubjectKey } from "@/lib/subjects";
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

function TeacherCard({
  teacher,
  index,
}: {
  teacher: Teacher;
  index: number;
}) {
  const subjects = resolveSubjects(teacher);
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
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
      </div>
    </motion.div>
  );
}

export default function TeacherList() {
  const [query, setQuery] = useState("");

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

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center text-sm text-slate-400">
          Tidak ada guru yang cocok dengan pencarian “{query}”.
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((t, i) => (
            <TeacherCard key={t.id} teacher={t} index={i} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
