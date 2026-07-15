import type { SubjectKey } from "./subjects";

const ALL_SUBJECTS: SubjectKey[] = [
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
];

export interface Teacher {
  id: number;
  name: string;
  classes: string[];
  /** When true, teaches every subject (minus `except`, plus `extra`). */
  subjectsAll?: boolean;
  except?: SubjectKey[];
  extra?: SubjectKey[];
  subjects?: SubjectKey[];
  note?: string;
}

export const TEACHERS: Teacher[] = [
  {
    id: 1,
    name: "Bu Zaidah",
    classes: ["4A", "4B", "5A", "5B", "6A", "6B"],
    subjects: ["AA", "SKI"],
  },
  {
    id: 2,
    name: "Bu Evis S",
    classes: ["3"],
    subjectsAll: true,
    except: ["PJOK"],
  },
  {
    id: 3,
    name: "Bu Ulwiyah",
    classes: ["5A", "5B", "6A", "6B"],
    subjectsAll: true,
  },
  {
    id: 4,
    name: "Bu Nafisah",
    classes: ["5A", "5B"],
    subjects: ["MTK", "B.IND", "IPAS", "PKN", "B. Jawa"],
  },
  {
    id: 5,
    name: "Bu Mala",
    classes: ["6A", "6B"],
    subjects: ["MTK", "B.IND", "IPAS", "PKN", "SBdP"],
  },
  {
    id: 6,
    name: "Pak Kholil",
    classes: ["6A", "6B"],
    subjects: ["MTK", "B.IND", "IPAS", "PKN", "B.ING"],
    note: "PKN (6B)",
  },
  {
    id: 7,
    name: "Pak Amir",
    classes: ["4A", "4B", "5A", "5B", "6A", "6B"],
    subjects: ["B.IND", "IPAS", "PKN", "QH", "Fiqih"],
  },
  {
    id: 8,
    name: "Pak Wendi",
    classes: ["4A", "4B", "5A", "5B", "6A", "6B"],
    subjects: ["BTQ", "B. Arab"],
  },
  {
    id: 9,
    name: "Bu Amal",
    classes: ["6A", "6B"],
    subjectsAll: true,
    extra: ["BTQ"],
  },
  {
    id: 10,
    name: "Bu Nisa",
    classes: ["4A", "4B", "6A", "6B"],
    subjectsAll: true,
    extra: ["B. Jawa"],
  },
  {
    id: 11,
    name: "Bu Nulan",
    classes: ["4A", "4B"],
    subjectsAll: true,
    extra: ["B.ING"],
  },
  {
    id: 12,
    name: "Pak Ansor",
    classes: ["3", "4", "5", "6"],
    subjects: ["B.IND", "IPAS", "PKN", "PJOK"],
  },
  {
    id: 13,
    name: "Bu Lusi",
    classes: ["5A", "5B"],
    subjects: ["MTK", "B.IND", "IPAS", "PKN", "SBdP"],
  },
];

export function resolveSubjects(t: Teacher): SubjectKey[] {
  if (t.subjectsAll) {
    const base = ALL_SUBJECTS.filter(
      (s) => !(t.except ?? []).includes(s)
    );
    const extra = (t.extra ?? []).filter((s) => !base.includes(s));
    return [...base, ...extra];
  }
  return t.subjects ?? [];
}

export function teacherInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((p) => p[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
