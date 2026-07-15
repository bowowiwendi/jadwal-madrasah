"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, GraduationCap, School, Sparkles } from "lucide-react";

import { CLASS_ORDER, SCHEDULE } from "@/lib/data";
import type { SubjectKey } from "@/lib/subjects";
import { TEACHERS } from "@/lib/teachers";

import MainTabs, { type ViewKey } from "./MainTabs";
import ClassTabs from "./ClassTabs";
import SubjectLegend from "./SubjectLegend";
import ScheduleGrid from "./ScheduleGrid";
import ScheduleCards from "./ScheduleCards";
import TeacherList from "./TeacherList";

export default function ScheduleApp() {
  const [view, setView] = useState<ViewKey>("schedule");
  const [activeClass, setActiveClass] = useState<string>(CLASS_ORDER[0]);
  const [highlight, setHighlight] = useState<SubjectKey | null>(null);

  const slots = useMemo(() => SCHEDULE[activeClass], [activeClass]);

  const toggleHighlight = (subject: SubjectKey) =>
    setHighlight((prev) => (prev === subject ? null : subject));

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
                <School className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-indigo-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  Jadwal Pelajaran &amp; Daftar Guru
                </p>
                <h1 className="mt-1 text-xl font-extrabold leading-tight sm:text-2xl">
                  MI JAMIYATUL FALAH KEDUNGNENG
                </h1>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-300">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 font-semibold text-white ring-1 ring-white/15">
                    <GraduationCap className="h-3.5 w-3.5" />
                    Tahun Ajaran 2026/2027
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-slate-300">
                    <BookOpen className="h-3.5 w-3.5" />
                    {CLASS_ORDER.length} Kelas · {TEACHERS.length} Guru
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top-level view navigation */}
        <div className="border-t border-white/10 bg-slate-900/40 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            <MainTabs
              view={view}
              onChange={setView}
              teacherCount={TEACHERS.length}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <AnimatePresence mode="wait">
          {view === "schedule" ? (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div className="mb-5">
                <ClassTabs
                  classes={CLASS_ORDER}
                  active={activeClass}
                  onChange={setActiveClass}
                />
              </div>
              <div className="mb-6">
                <SubjectLegend
                  highlight={highlight}
                  onToggle={toggleHighlight}
                  onClear={() => setHighlight(null)}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeClass}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  {/* Desktop / tablet table */}
                  <div className="hidden md:block">
                    <ScheduleGrid slots={slots} highlight={highlight} />
                  </div>
                  {/* Mobile card layout */}
                  <div className="md:hidden">
                    <ScheduleCards slots={slots} highlight={highlight} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="teachers"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <TeacherList />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-2 text-center text-xs text-slate-400 sm:px-6">
        MI JAMIYATUL FALAH KEDUNGNENG · Tahun Ajaran 2026/2027 · Dibuat dengan
        Next.js &amp; Tailwind CSS
      </footer>
    </main>
  );
}
