"use client";

import { motion } from "framer-motion";
import { Coffee } from "lucide-react";
import { DAYS, DAY_SHORT, type SubjectKey } from "@/lib/subjects";
import type { Slot } from "@/lib/data";
import SubjectCell from "./SubjectCell";

interface ScheduleGridProps {
  slots: Slot[];
  highlight: SubjectKey | null;
}

const GRID = "grid grid-cols-[112px_repeat(6,minmax(112px,1fr))]";

export default function ScheduleGrid({ slots, highlight }: ScheduleGridProps) {
  return (
    <div className="overflow-x-auto scrollbar-thin rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="min-w-[840px]">
        {/* Header */}
        <div
          className={`${GRID} rounded-t-2xl border-b border-slate-200 bg-slate-100 text-center`}
        >
          <div className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
            Waktu
          </div>
          {DAYS.map((day) => (
            <div
              key={day}
              className="border-l border-slate-200 px-2 py-3 text-sm font-bold text-slate-700"
            >
              <span className="block">{day}</span>
              <span className="block text-[11px] font-medium text-slate-400">
                {DAY_SHORT[day]}
              </span>
            </div>
          ))}
        </div>

        {/* Rows */}
        <div>
          {slots.map((slot, i) => {
            if (slot.isBreak) {
              return (
                <motion.div
                  key={`break-${slot.time}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.015 }}
                  className="flex items-center justify-center gap-2 border-b border-slate-100 bg-slate-50 px-3 py-2.5 text-sm italic text-slate-500"
                >
                  <Coffee className="h-4 w-4" />
                  <span className="font-medium">Istirahat</span>
                  <span className="text-xs not-italic text-slate-400">
                    ({slot.time})
                  </span>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={slot.time}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02, duration: 0.25 }}
                className={`${GRID} border-b border-slate-100 last:border-b-0`}
              >
                <div className="flex flex-col justify-center px-3 py-2 text-left">
                  <span className="text-xs font-bold text-slate-700">
                    {slot.time.split(" - ")[0]}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {slot.time.split(" - ")[1]}
                  </span>
                </div>
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="border-l border-slate-100 p-1.5"
                  >
                    <SubjectCell
                      subject={slot.cells[day]}
                      highlight={highlight}
                    />
                  </div>
                ))}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
