"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

interface ClassTabsProps {
  classes: string[];
  active: string;
  onChange: (value: string) => void;
}

export default function ClassTabs({
  classes,
  active,
  onChange,
}: ClassTabsProps) {
  return (
    <div className="w-full">
      <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
        {classes.map((cls) => {
          const isActive = cls === active;
          return (
            <button
              key={cls}
              type="button"
              onClick={() => onChange(cls)}
              className="relative shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="active-class-tab"
                  className="absolute inset-0 rounded-xl bg-white shadow-sm ring-1 ring-slate-200"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-1.5 ${
                  isActive ? "text-slate-900" : "text-slate-300 hover:text-white"
                }`}
              >
                <GraduationCap
                  className={`h-4 w-4 ${
                    isActive ? "text-indigo-600" : "text-slate-400"
                  }`}
                />
                {cls}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
