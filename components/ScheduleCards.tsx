"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock, Coffee } from "lucide-react";
import { DAYS, type SubjectKey } from "@/lib/subjects";
import type { Slot } from "@/lib/data";
import SubjectCell from "./SubjectCell";

interface ScheduleCardsProps {
  slots: Slot[];
  highlight: SubjectKey | null;
}

export default function ScheduleCards({
  slots,
  highlight,
}: ScheduleCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {DAYS.map((day, di) => (
        <motion.div
          key={day}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: di * 0.05, duration: 0.3 }}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="flex items-center gap-2 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-4 py-3">
            <CalendarDays className="h-4 w-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-800">{day}</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {slots.map((slot, i) => {
              if (slot.isBreak) {
                return (
                  <div
                    key={`${day}-break-${slot.time}`}
                    className="flex items-center gap-2 bg-slate-50 px-4 py-2 text-xs italic text-slate-500"
                  >
                    <Coffee className="h-3.5 w-3.5" />
                    Istirahat
                    <span className="not-italic text-slate-400">
                      · {slot.time}
                    </span>
                  </div>
                );
              }

              const subject = slot.cells[day];
              return (
                <div
                  key={`${day}-${slot.time}`}
                  className="flex items-center gap-3 px-4 py-2.5"
                >
                  <div className="flex w-20 shrink-0 flex-col">
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-700">
                      <Clock className="h-3 w-3 text-slate-400" />
                      {slot.time.split(" - ")[0]}
                    </span>
                    <span className="pl-4 text-[10px] text-slate-400">
                      {slot.time.split(" - ")[1]}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <SubjectCell subject={subject} highlight={highlight} />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
