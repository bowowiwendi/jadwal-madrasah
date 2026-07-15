export type SubjectKey =
  | "MTK"
  | "B.IND"
  | "B.ING"
  | "PKN"
  | "IPAS"
  | "PJOK"
  | "SBdP"
  | "QH"
  | "AA"
  | "SKI"
  | "BTQ"
  | "B. Arab"
  | "B. Jawa"
  | "Fiqih"
  | "Upacara"
  | "Senam"
  | "Istirahat";

export interface SubjectMeta {
  abbr: SubjectKey;
  name: string;
  /** Badge / cell styling (light theme) */
  badge: string;
  /** Small dot color */
  dot: string;
  /** Accent border used when highlighted */
  ring: string;
}

export const SUBJECTS: Record<SubjectKey, SubjectMeta> = {
  MTK: {
    abbr: "MTK",
    name: "Matematika",
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
    dot: "bg-indigo-500",
    ring: "ring-indigo-400",
  },
  "B.IND": {
    abbr: "B.IND",
    name: "Bahasa Indonesia",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    ring: "ring-blue-400",
  },
  "B.ING": {
    abbr: "B.ING",
    name: "Bahasa Inggris",
    badge: "bg-sky-50 text-sky-700 border-sky-200",
    dot: "bg-sky-500",
    ring: "ring-sky-400",
  },
  PKN: {
    abbr: "PKN",
    name: "Pendidikan Pancasila",
    badge: "bg-violet-50 text-violet-700 border-violet-200",
    dot: "bg-violet-500",
    ring: "ring-violet-400",
  },
  IPAS: {
    abbr: "IPAS",
    name: "Ilmu Pengetahuan Alam dan Sosial",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    ring: "ring-emerald-400",
  },
  PJOK: {
    abbr: "PJOK",
    name: "Pendidikan Jasmani, Olahraga, dan Kesehatan",
    badge: "bg-orange-50 text-orange-700 border-orange-200",
    dot: "bg-orange-500",
    ring: "ring-orange-400",
  },
  SBdP: {
    abbr: "SBdP",
    name: "Seni Budaya dan Prakarya",
    badge: "bg-pink-50 text-pink-700 border-pink-200",
    dot: "bg-pink-500",
    ring: "ring-pink-400",
  },
  QH: {
    abbr: "QH",
    name: "Al-Qur'an Hadits",
    badge: "bg-green-50 text-green-700 border-green-200",
    dot: "bg-green-500",
    ring: "ring-green-400",
  },
  AA: {
    abbr: "AA",
    name: "Akidah Akhlak",
    badge: "bg-teal-50 text-teal-700 border-teal-200",
    dot: "bg-teal-500",
    ring: "ring-teal-400",
  },
  SKI: {
    abbr: "SKI",
    name: "Sejarah Kebudayaan Islam",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    ring: "ring-amber-400",
  },
  BTQ: {
    abbr: "BTQ",
    name: "Baca Tulis Al-Qur'an",
    badge: "bg-cyan-50 text-cyan-700 border-cyan-200",
    dot: "bg-cyan-500",
    ring: "ring-cyan-400",
  },
  "B. Arab": {
    abbr: "B. Arab",
    name: "Bahasa Arab",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    dot: "bg-rose-500",
    ring: "ring-rose-400",
  },
  "B. Jawa": {
    abbr: "B. Jawa",
    name: "Bahasa Jawa",
    badge: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
    dot: "bg-fuchsia-500",
    ring: "ring-fuchsia-400",
  },
  Fiqih: {
    abbr: "Fiqih",
    name: "Fiqih",
    badge: "bg-lime-50 text-lime-700 border-lime-200",
    dot: "bg-lime-500",
    ring: "ring-lime-400",
  },
  Upacara: {
    abbr: "Upacara",
    name: "Upacara Bendera",
    badge: "bg-slate-800 text-white border-slate-900",
    dot: "bg-slate-800",
    ring: "ring-slate-500",
  },
  Senam: {
    abbr: "Senam",
    name: "Senam Pagi",
    badge: "bg-teal-500 text-white border-teal-600",
    dot: "bg-teal-500",
    ring: "ring-teal-400",
  },
  Istirahat: {
    abbr: "Istirahat",
    name: "Istirahat",
    badge: "bg-slate-100 text-slate-500 border-slate-200 italic",
    dot: "bg-slate-400",
    ring: "ring-slate-300",
  },
};

export const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"] as const;
export type Day = (typeof DAYS)[number];

export const DAY_SHORT: Record<Day, string> = {
  Senin: "Sen",
  Selasa: "Sel",
  Rabu: "Rab",
  Kamis: "Kam",
  Jumat: "Jum",
  Sabtu: "Sab",
};
