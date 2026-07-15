"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { SUBJECTS, type SubjectKey } from "@/lib/subjects";

const LEGEND_ORDER: SubjectKey[] = [
  "MTK",
  "B.IND",
  "B.ING",
  "PKN",
  "IPAS",
  "PJOK",
  "SBdP",
  "QH",
  "AA",
  "SKI",
  "BTQ",
  "B. Arab",
  "B. Jawa",
  "Fiqih",
  "Upacara",
  "Senam",
];

interface SubjectLegendProps {
  highlight: SubjectKey | null;
  onToggle: (subject: SubjectKey) => void;
  onClear: () => void;
}

export default function SubjectLegend({
  highlight,
  onToggle,
  onClear,
}: SubjectLegendProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-700">
          Sorot Mata Pelajaran
        </h2>
        {highlight && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-200"
          >
            <X className="h-3 w-3" />
            Hapus sorotan
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {LEGEND_ORDER.map((key) => {
          const meta = SUBJECTS[key];
          const isActive = highlight === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onToggle(key)}
              title={meta.name}
              className={[
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition-all duration-200",
                meta.badge,
                isActive ? `ring-2 ${meta.ring} scale-105 shadow` : "hover:scale-105",
              ].join(" ")}
            >
              <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
}
