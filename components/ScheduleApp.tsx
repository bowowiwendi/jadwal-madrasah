"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, GraduationCap, School, Settings2, Sparkles } from "lucide-react";

import { CLASS_ORDER } from "@/lib/data";
import type { SubjectKey } from "@/lib/subjects";

import MainTabs, { type ViewKey } from "./MainTabs";
import ClassTabs from "./ClassTabs";
import SubjectLegend from "./SubjectLegend";
import ScheduleGrid from "./ScheduleGrid";
import ScheduleCards from "./ScheduleCards";
import TeacherList from "./TeacherList";
import PembiasaanPagi from "./PembiasaanPagi";
import DashboardHariIni from "./DashboardHariIni";
import InfoSekolah from "./InfoSekolah";
import AdminPanel from "./AdminPanel";
import { AppSettingsProvider } from "./SettingsContext";
import { AppDataProvider, useAppData } from "./AppDataContext";

function AppBody() {
  const { data } = useAppData();
  const [view, setView] = useState<ViewKey>("dashboard");
  const classes = Object.keys(data.schedule);
  const [activeClass, setActiveClass] = useState<string>(CLASS_ORDER[0]);
  const [highlight, setHighlight] = useState<SubjectKey | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);

  const slots = useMemo(() => {
    const cls = classes.includes(activeClass) ? activeClass : classes[0] ?? CLASS_ORDER[0];
    return data.schedule[cls] ?? [];
  }, [classes, activeClass, data.schedule]);

  const toggleHighlight = (subject: SubjectKey) =>
    setHighlight((prev) => (prev === subject ? null : subject));

  return (
    <AppSettingsProvider>
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
                  {data.info.tagline}
                </p>
                <h1 className="mt-1 text-xl font-extrabold leading-tight sm:text-2xl">
                  {data.info.name}
                </h1>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-300">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 font-semibold text-white ring-1 ring-white/15">
                    <GraduationCap className="h-3.5 w-3.5" />
                    {data.info.year}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-slate-300">
                    <BookOpen className="h-3.5 w-3.5" />
                    {classes.length} Kelas · {data.teachers.length} Guru
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAdminOpen(true)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20"
                aria-label="Pengaturan Admin"
              >
                <Settings2 className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            </div>
          </div>
        </div>

        {/* Top-level view navigation */}
        <div className="border-t border-white/10 bg-slate-900/40 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            <MainTabs
              view={view}
              onChange={setView}
              teacherCount={data.teachers.length}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <AnimatePresence mode="wait">
          {view === "dashboard" ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <DashboardHariIni />
            </motion.div>
          ) : view === "schedule" ? (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div className="mb-5">
                <ClassTabs
                  classes={classes}
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
                    <ScheduleGrid slots={slots} highlight={highlight} classKey={activeClass} />
                  </div>
                  {/* Mobile card layout */}
                  <div className="md:hidden">
                    <ScheduleCards slots={slots} highlight={highlight} classKey={activeClass} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ) : view === "teachers" ? (
            <motion.div
              key="teachers"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <TeacherList />
            </motion.div>
          ) : view === "routine" ? (
            <motion.div
              key="routine"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <PembiasaanPagi />
            </motion.div>
          ) : (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <InfoSekolah />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-2 text-center text-xs text-slate-400 sm:px-6">
        {data.info.footer}
      </footer>

      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} />
    </main>
    </AppSettingsProvider>
  );
}

export default function ScheduleApp() {
  return (
    <AppDataProvider>
      <AppBody />
    </AppDataProvider>
  );
}
