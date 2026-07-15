import { DAYS, type Day, type SubjectKey } from "./subjects";

export type Cell = SubjectKey | null;

export interface Slot {
  time: string;
  isBreak: boolean;
  cells: Record<Day, Cell>;
}

const mk = (time: string, values: [Cell, Cell, Cell, Cell, Cell, Cell]): Slot => ({
  time,
  isBreak: false,
  cells: {
    Senin: values[0],
    Selasa: values[1],
    Rabu: values[2],
    Kamis: values[3],
    Jumat: values[4],
    Sabtu: values[5],
  },
});

const brk = (time: string): Slot => ({
  time,
  isBreak: true,
  cells: {
    Senin: "Istirahat",
    Selasa: "Istirahat",
    Rabu: "Istirahat",
    Kamis: "Istirahat",
    Jumat: "Istirahat",
    Sabtu: "Istirahat",
  },
});

export const SCHEDULE: Record<string, Slot[]> = {
  "KELAS 3": [
    mk("07.15 - 07.50", ["Upacara", "IPAS", "MTK", "B.IND", "Senam", "BTQ"]),
    mk("07.50 - 08.25", ["MTK", "IPAS", "MTK", "B.IND", "PJOK", "BTQ"]),
    mk("08.25 - 09.00", ["MTK", "IPAS", "MTK", "PKN", "PJOK", "SBdP"]),
    brk("09.00 - 09.15"),
    mk("09.15 - 09.50", ["PKN", "B.IND", "IPAS", "B. Arab", "PJOK", "SBdP"]),
    mk("09.50 - 10.25", ["PKN", "B.IND", "SKI", "B. Arab", "B. Jawa", "SBdP"]),
    mk("10.25 - 11.00", ["PKN", "B.IND", "SKI", "PJOK", "B. Jawa", "SBdP"]),
    brk("11.00 - 11.15"),
    mk("11.15 - 11.50", ["Fiqih", "QH", "AA", "B.ING", null, null]),
    mk("11.50 - 12.25", ["Fiqih", "QH", "AA", "B.ING", null, null]),
  ],
  "KELAS 4A": [
    mk("07.15 - 07.50", ["Upacara", "IPAS", "MTK", "PJOK", "Senam", "Fiqih"]),
    mk("07.50 - 08.25", ["B.IND", "IPAS", "MTK", "PJOK", "AA", "Fiqih"]),
    mk("08.25 - 09.00", ["B.IND", "IPAS", "MTK", "PJOK", "AA", "BTQ"]),
    brk("09.00 - 09.15"),
    mk("09.15 - 09.50", ["B.IND", "B.IND", "IPAS", "PJOK", "B. Arab", "BTQ"]),
    mk("09.50 - 10.25", ["MTK", "B.IND", "SKI", "QH", "B. Arab", "SBdP"]),
    mk("10.25 - 11.00", ["MTK", "PKN", "SKI", "QH", "PKN", "SBdP"]),
    brk("11.00 - 11.15"),
    mk("11.15 - 11.50", ["B. Jawa", "PKN", "B.ING", "SBdP", null, null]),
    mk("11.50 - 12.25", ["B. Jawa", "PKN", "B.ING", "SBdP", null, null]),
  ],
  "KELAS 4B": [
    mk("07.15 - 07.50", ["Upacara", "MTK", "PKN", "PJOK", "Senam", "B.IND"]),
    mk("07.50 - 08.25", ["IPAS", "MTK", "PKN", "PJOK", "QH", "B.IND"]),
    mk("08.25 - 09.00", ["IPAS", "MTK", "PKN", "PJOK", "QH", "SBdP"]),
    brk("09.00 - 09.15"),
    mk("09.15 - 09.50", ["IPAS", "AA", "PKN", "PJOK", "IPAS", "SBdP"]),
    mk("09.50 - 10.25", ["B. Arab", "AA", "MTK", "BTQ", "B.ING", "Fiqih"]),
    mk("10.25 - 11.00", ["B. Arab", "B.IND", "MTK", "BTQ", "B.ING", "Fiqih"]),
    brk("11.00 - 11.15"),
    mk("11.15 - 11.50", ["SKI", "B.IND", "B. Jawa", "SBdP", null, null]),
    mk("11.50 - 12.25", ["SKI", "B.IND", "B. Jawa", "SBdP", null, null]),
  ],
  "KELAS 5A": [
    mk("07.15 - 07.50", ["Upacara", "MTK", "PJOK", "MTK", "Senam", "B. Arab"]),
    mk("07.50 - 08.25", ["B.IND", "MTK", "PJOK", "MTK", "SBdP", "B. Arab"]),
    mk("08.25 - 09.00", ["B.IND", "MTK", "PJOK", "IPAS", "SBdP", "IPAS"]),
    brk("09.00 - 09.15"),
    mk("09.15 - 09.50", ["B.IND", "PKN", "PJOK", "AA", "SBdP", "IPAS"]),
    mk("09.50 - 10.25", ["Fiqih", "PKN", "IPAS", "AA", "QH", "SKI"]),
    mk("10.25 - 11.00", ["Fiqih", "PKN", "IPAS", "PKN", "QH", "SKI"]),
    brk("11.00 - 11.15"),
    mk("11.15 - 11.50", ["B. Jawa", "BTQ", "B.ING", "B.IND", null, null]),
    mk("11.50 - 12.25", ["B. Jawa", "BTQ", "B.ING", "B.IND", null, null]),
  ],
  "KELAS 5B": [
    mk("07.15 - 07.50", ["Upacara", "IPAS", "PJOK", "B.IND", "Senam", "SBdP"]),
    mk("07.50 - 08.25", ["B.IND", "IPAS", "PJOK", "B.IND", "PKN", "SBdP"]),
    mk("08.25 - 09.00", ["B.IND", "IPAS", "PJOK", "IPAS", "PKN", "SBdP"]),
    brk("09.00 - 09.15"),
    mk("09.15 - 09.50", ["B.IND", "B. Arab", "PJOK", "MTK", "PKN", "SBdP"]),
    mk("09.50 - 10.25", ["MTK", "B. Arab", "Fiqih", "MTK", "AA", "BTQ"]),
    mk("10.25 - 11.00", ["MTK", "PKN", "Fiqih", "MTK", "AA", "BTQ"]),
    brk("11.00 - 11.15"),
    mk("11.15 - 11.50", ["B.ING", "B. Jawa", "QH", "SKI", null, null]),
    mk("11.50 - 12.25", ["B.ING", "B. Jawa", "QH", "SKI", null, null]),
  ],
  "KELAS 6A": [
    mk("07.15 - 07.50", ["Upacara", "PJOK", "B. Arab", "IPAS", "Senam", "PKN"]),
    mk("07.50 - 08.25", ["B.IND", "PJOK", "B. Arab", "IPAS", "SBdP", "PKN"]),
    mk("08.25 - 09.00", ["B.IND", "PJOK", "AA", "IPAS", "SBdP", "B.ING"]),
    brk("09.00 - 09.15"),
    mk("09.15 - 09.50", ["B.IND", "PJOK", "AA", "IPAS", "MTK", "B.ING"]),
    mk("09.50 - 10.25", ["SKI", "MTK", "PKN", "B.IND", "MTK", "QH"]),
    mk("10.25 - 11.00", ["SKI", "MTK", "PKN", "B.IND", "MTK", "QH"]),
    brk("11.00 - 11.15"),
    mk("11.15 - 11.50", ["Fiqih", "B. Jawa", "SBdP", "BTQ", null, null]),
    mk("11.50 - 12.25", ["Fiqih", "B. Jawa", "SBdP", "BTQ", null, null]),
  ],
  "KELAS 6B": [
    mk("07.15 - 07.50", ["Upacara", "PJOK", "MTK", "SKI", "Senam", "AA"]),
    mk("07.50 - 08.25", ["B.IND", "PJOK", "MTK", "SKI", "MTK", "AA"]),
    mk("08.25 - 09.00", ["B.IND", "PJOK", "MTK", "SBdP", "MTK", "IPAS"]),
    brk("09.00 - 09.15"),
    mk("09.15 - 09.50", ["B.IND", "SBdP", "PKN", "SBdP", "PKN", "IPAS"]),
    mk("09.50 - 10.25", ["IPAS", "IPAS", "PJOK", "B.IND", "BTQ", "B. Jawa"]),
    mk("10.25 - 11.00", ["IPAS", "PJOK", "BTQ", "B.IND", "BTQ", "B. Jawa"]),
    brk("11.00 - 11.15"),
    mk("11.15 - 11.50", ["B. Arab", "Fiqih", "B.ING", "QH", null, null]),
    mk("11.50 - 12.25", ["B. Arab", "Fiqih", "B.ING", "QH", null, null]),
  ],
};

export const CLASS_ORDER = Object.keys(SCHEDULE);
