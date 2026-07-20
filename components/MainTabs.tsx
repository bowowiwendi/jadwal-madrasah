"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  CalendarRange,
  LayoutDashboard,
  Sun,
  Users,
} from "lucide-react";

export type ViewKey =
  | "dashboard"
  | "schedule"
  | "teachers"
  | "routine"
  | "info";

interface MainTabsProps {
  view: ViewKey;
  onChange: (view: ViewKey) => void;
  teacherCount: number;
}

const TABS: { key: ViewKey; label: string; icon: typeof CalendarDays }[] = [
  { key: "dashboard", label: "Dashboard Hari Ini", icon: LayoutDashboard },
  { key: "schedule", label: "Jadwal Pelajaran", icon: CalendarDays },
  { key: "teachers", label: "Daftar Guru", icon: Users },
  { key: "routine", label: "Pembiasaan Pagi", icon: Sun },
  { key: "info", label: "Info Sekolah", icon: CalendarRange },
];

export default function MainTabs({
  view,
  onChange,
  teacherCount,
}: MainTabsProps) {
  return (
    <div className="w-full overflow-x-auto rounded-xl bg-slate-100 p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max min-w-full gap-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = view === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              className="relative flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors"
            >
            {isActive && (
              <motion.span
                layoutId="active-view-tab"
                className="absolute inset-0 rounded-lg bg-white shadow-sm ring-1 ring-slate-200"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span
              className={`relative z-10 flex items-center justify-center gap-1.5 ${
                isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              {tab.key === "teachers" && (
                <span className="ml-0.5 rounded-full bg-indigo-100 px-1.5 text-[10px] font-bold text-indigo-700">
                  {teacherCount}
                </span>
              )}
            </span>
          </button>
        );
      })}
      </div>
    </div>
  );
}
