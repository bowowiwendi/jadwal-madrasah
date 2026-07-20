import { getIndonesianWeekday, getPasaran } from "./calendar";

export interface Piket {
  Hari: string;
  Kelas: string;
  "Sholat Duha dan Duhur": string;
  "Salam Sapa": string;
}

export interface Seragam {
  "Hari / Waktu": string;
  "Pakaian Seragam": string;
}

export interface Upacara {
  No: number;
  "Hari, Tanggal": string;
  Petugas: string;
  Pembina: string;
}

export interface KegiatanJumat {
  "Jadwal Olahraga / Kegiatan Jumat": string;
  Kegiatan: string;
}

export const JADWAL_PIKET: Piket[] = [
  { Hari: "Senin", Kelas: "6A + 4A", "Sholat Duha dan Duhur": "Kholil, Ulwiyas, Lusi", "Salam Sapa": "Kholil, Ulwiyas, Lusi, Wulan, Zaidah" },
  { Hari: "Selasa", Kelas: "5A + 4B", "Sholat Duha dan Duhur": "Napisah, Wendi, Mala", "Salam Sapa": "Napisah, Wendi, Mala, Zaidah" },
  { Hari: "Rabu", Kelas: "6B", "Sholat Duha dan Duhur": "Ansor, Nisa, Amal", "Salam Sapa": "Ansor, Nisa, Wendi, Amal, Amirin, Zaidah" },
  { Hari: "Kamis", Kelas: "5B", "Sholat Duha dan Duhur": "Amirin, Wulan, Evi S.", "Salam Sapa": "Amirin, Wulan, Evi S., Napisah, Zaidah" },
  { Hari: "Jumat", Kelas: "4A + 4B", "Sholat Duha dan Duhur": "Lusi, Mala", "Salam Sapa": "Lusi, Mala, Nisa, Kholil, Zaidah" },
  { Hari: "Sabtu", Kelas: "3", "Sholat Duha dan Duhur": "Evi, Amal", "Salam Sapa": "Evi S., Amal, Ulwiyas, Ansori, Zaidah" },
];

export const JADWAL_SERAGAM: Seragam[] = [
  { "Hari / Waktu": "Senin + Selasa", "Pakaian Seragam": "Hitam Putih" },
  { "Hari / Waktu": "Rabu 1", "Pakaian Seragam": "Batik Ijo" },
  { "Hari / Waktu": "Rabu 2", "Pakaian Seragam": "Batik Biru" },
  { "Hari / Waktu": "Rabu 3", "Pakaian Seragam": "Batik Coklat" },
  { "Hari / Waktu": "Rabu 4", "Pakaian Seragam": "Batik Ungu" },
  { "Hari / Waktu": "Rabu 5", "Pakaian Seragam": "Batik Oranye / Kecoklatan" },
  { "Hari / Waktu": "Kamis", "Pakaian Seragam": "Batik Bebas" },
  { "Hari / Waktu": "Jumat 1", "Pakaian Seragam": "Kaos Pink" },
  { "Hari / Waktu": "Jumat 2", "Pakaian Seragam": "Kaos KKG" },
  { "Hari / Waktu": "Jumat 3", "Pakaian Seragam": "Kaos Kemah" },
  { "Hari / Waktu": "Jumat 4", "Pakaian Seragam": "Kaos Biru Piknik" },
  { "Hari / Waktu": "Jumat Kliwon / Kliwon 1", "Pakaian Seragam": "Gamis Ungu" },
  { "Hari / Waktu": "Kliwon 2", "Pakaian Seragam": "Gamis Hitam" },
  { "Hari / Waktu": "Kliwon 3", "Pakaian Seragam": "Gamis Kuning" },
  { "Hari / Waktu": "Kliwon 4", "Pakaian Seragam": "Gamis Hijau" },
  { "Hari / Waktu": "Kliwon 5", "Pakaian Seragam": "Gamis Putih" },
  { "Hari / Waktu": "Sabtu", "Pakaian Seragam": "Pramuka / PGRI" },
  { "Hari / Waktu": "Setiap Tgl 17", "Pakaian Seragam": "Korpri" },
  { "Hari / Waktu": "Setiap Tgl 22", "Pakaian Seragam": "Kebaya" },
];

export const JADWAL_UPACARA: {
  tabel_petugas: Upacara[];
  catatan: string[];
} = {
  tabel_petugas: [
    { No: 1, "Hari, Tanggal": "Senin, 27 07 2026", Petugas: "6A", Pembina: "B. Zaidah" },
    { No: 2, "Hari, Tanggal": "Senin, 10 08 2026", Petugas: "6B", Pembina: "P. Kholil" },
    { No: 3, "Hari, Tanggal": "Senin, 31 08 2026", Petugas: "5A", Pembina: "B. Napisah" },
    { No: 4, "Hari, Tanggal": "Senin, 14 09 2026", Petugas: "5B", Pembina: "P. Ansor" },
    { No: 5, "Hari, Tanggal": "Senin, 28 09 2026", Petugas: "4A", Pembina: "B. Lusi" },
    { No: 6, "Hari, Tanggal": "Senin, 12 10 2026", Petugas: "4B", Pembina: "B. Mala" },
    { No: 7, "Hari, Tanggal": "Senin, 26 10 2026", Petugas: "6A", Pembina: "B. Mala" },
    { No: 8, "Hari, Tanggal": "Senin, 09 11 2026", Petugas: "6B", Pembina: "B. Ulwiyas" },
    { No: 9, "Hari, Tanggal": "Rabu, 25 11 2026", Petugas: "Guru", Pembina: "B. Zaidah" },
    { No: 10, "Hari, Tanggal": "Senin, 11 01 2027", Petugas: "5A", Pembina: "P. Wendi" },
    { No: 11, "Hari, Tanggal": "Senin, 25 01 2027", Petugas: "5B", Pembina: "B. Mala" },
    { No: 12, "Hari, Tanggal": "Senin, 22 03 2027", Petugas: "4B", Pembina: "B. Wulan" },
  ],
  catatan: [
    "Catatan Tambahan: Bulan Desember Asas Semester gasal.",
    "Catatan Tambahan: Bulan April s/d Mei Rentang Asasmen, ujian praktek, ujian Madrasah.",
    "Pergeseran Jadwal: Senin 26 10 2026 bisa geser ke Tgl 28 10 2026 (Sumpah Pemuda)",
    "Pergeseran Jadwal: Senin 09 11 2026 bisa geser ke Tgl 10 11 2026 (Hari Pahlawan)",
    "Pergeseran Jadwal: Senin 23 11 2026 bisa geser ke Tgl 25 11 2026 (Hari Guru)",
  ],
};

export const KEGIATAN_JUMAT: KegiatanJumat[] = [
  { "Jadwal Olahraga / Kegiatan Jumat": "Jumat 1", Kegiatan: "Jalan Sehat" },
  { "Jadwal Olahraga / Kegiatan Jumat": "Jumat 2", Kegiatan: "Senam" },
  { "Jadwal Olahraga / Kegiatan Jumat": "Jumat 3", Kegiatan: "Bersih-bersih" },
  { "Jadwal Olahraga / Kegiatan Jumat": "Jumat Kliwon", Kegiatan: "Yasin dan Tahlil" },
];

const RABU = ["Batik Ijo", "Batik Biru", "Batik Coklat", "Batik Ungu", "Batik Oranye / Kecoklatan"];
const JUMAT_KAOS = ["Kaos Pink", "Kaos KKG", "Kaos Kemah", "Kaos Biru Piknik"];
const KLIWON_GAMIS = ["Gamis Ungu", "Gamis Hitam", "Gamis Kuning", "Gamis Hijau", "Gamis Putih"];

function occurrenceInMonth(date: Date, matcher: (d: Date) => boolean): number {
  let count = 0;
  const y = date.getFullYear();
  const m = date.getMonth();
  for (let day = 1; day <= date.getDate(); day++) {
    if (matcher(new Date(y, m, day))) count++;
  }
  return count;
}

const pick = <T,>(arr: T[], n: number): T => arr[((n - 1) % arr.length + arr.length) % arr.length];

/** Seragam yang dikenakan hari ini (memperhitungkan minggu ke-, pasaran, dan tgl 17/22). */
export function getTodayUniform(date: Date = new Date()): string {
  const tgl = date.getDate();
  if (tgl === 17) return "Korpri";
  if (tgl === 22) return "Kebaya";

  const wd = getIndonesianWeekday(date);
  if (wd === "Senin" || wd === "Selasa") return "Hitam Putih";
  if (wd === "Kamis") return "Batik Bebas";
  if (wd === "Sabtu") return "Pramuka / PGRI";
  if (wd === "Rabu") {
    const n = occurrenceInMonth(date, (d) => getIndonesianWeekday(d) === "Rabu");
    return pick(RABU, n);
  }
  if (wd === "Jumat") {
    const pasaran = getPasaran(date);
    if (pasaran === "Kliwon") {
      const n = occurrenceInMonth(date, (d) => getPasaran(d) === "Kliwon");
      return pick(KLIWON_GAMIS, n);
    }
    const n = occurrenceInMonth(date, (d) => getIndonesianWeekday(d) === "Jumat");
    return pick(JUMAT_KAOS, n);
  }
  return "—";
}

export function getTodayPiket(date: Date = new Date()): Piket | null {
  const wd = getIndonesianWeekday(date);
  return JADWAL_PIKET.find((p) => p.Hari === wd) ?? null;
}

export function getTodayUpacara(date: Date = new Date()): Upacara | null {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return (
    JADWAL_UPACARA.tabel_petugas.find((u) => {
      const match = u["Hari, Tanggal"].match(/(\d{1,2})\s+(\d{2})\s+(\d{4})/);
      if (!match) return false;
      return Number(match[1]) === d && Number(match[2]) === m && Number(match[3]) === y;
    }) ?? null
  );
}

export function getTodayKegiatanJumat(date: Date = new Date()): string | null {
  const wd = getIndonesianWeekday(date);
  if (wd !== "Jumat") return null;
  const pasaran = getPasaran(date);
  if (pasaran === "Kliwon") return "Yasin dan Tahlil";
  const n = occurrenceInMonth(date, (d) => getIndonesianWeekday(d) === "Jumat");
  return pick(["Jalan Sehat", "Senam", "Bersih-bersih"], n);
}
