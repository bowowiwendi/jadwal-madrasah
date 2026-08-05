import type { Slot } from "./data";
import { SCHEDULE } from "./data";
import { TEACHERS, type Teacher } from "./teachers";
import {
  JADWAL_PIKET,
  JADWAL_SERAGAM,
  JADWAL_UPACARA,
  KEGIATAN_JUMAT,
  PETUGAS_PEMBIASAAN,
  type Piket,
  type Seragam,
  type Upacara,
  type KegiatanJumat,
} from "./school";

export interface SchoolInfo {
  name: string;
  tagline: string;
  year: string;
  footer: string;
}

/** Seluruh data aplikasi yang bisa diatur dari panel admin. */
export interface AdminData {
  info: SchoolInfo;
  piket: Piket[];
  seragam: Seragam[];
  upacara: Upacara[];
  upacaraCatatan: string[];
  kegiatanJumat: KegiatanJumat[];
  petugasPembiasaan: Record<string, string>;
  teachers: Teacher[];
  schedule: Record<string, Slot[]>;
  /** SHA-256 hash PIN admin (null = tanpa PIN). */
  pinHash: string | null;
}

export const DEFAULT_ADMIN_DATA: AdminData = {
  info: {
    name: "MI JAMIYATUL FALAH KEDUNGNENG",
    tagline: "Jadwal Pelajaran & Daftar Guru",
    year: "Tahun Ajaran 2026/2027",
    footer:
      "MI JAMIYATUL FALAH KEDUNGNENG · Tahun Ajaran 2026/2027 · Dibuat dengan Next.js & Tailwind CSS",
  },
  piket: JADWAL_PIKET,
  seragam: JADWAL_SERAGAM,
  upacara: JADWAL_UPACARA.tabel_petugas,
  upacaraCatatan: JADWAL_UPACARA.catatan,
  kegiatanJumat: KEGIATAN_JUMAT,
  petugasPembiasaan: PETUGAS_PEMBIASAAN,
  teachers: TEACHERS,
  schedule: SCHEDULE,
  pinHash: null,
};

/** Menggabungkan data tersimpan (bisa parsial / versi lama) dengan bawaan. */
export function mergeAdminData(stored: unknown): AdminData {
  const s = (stored && typeof stored === "object" ? stored : {}) as Partial<AdminData>;
  return {
    info: { ...DEFAULT_ADMIN_DATA.info, ...(s.info ?? {}) },
    piket: Array.isArray(s.piket) ? s.piket : DEFAULT_ADMIN_DATA.piket,
    seragam: Array.isArray(s.seragam) ? s.seragam : DEFAULT_ADMIN_DATA.seragam,
    upacara: Array.isArray(s.upacara) ? s.upacara : DEFAULT_ADMIN_DATA.upacara,
    upacaraCatatan: Array.isArray(s.upacaraCatatan)
      ? s.upacaraCatatan
      : DEFAULT_ADMIN_DATA.upacaraCatatan,
    kegiatanJumat: Array.isArray(s.kegiatanJumat)
      ? s.kegiatanJumat
      : DEFAULT_ADMIN_DATA.kegiatanJumat,
    petugasPembiasaan:
      s.petugasPembiasaan && typeof s.petugasPembiasaan === "object"
        ? s.petugasPembiasaan
        : DEFAULT_ADMIN_DATA.petugasPembiasaan,
    teachers: Array.isArray(s.teachers) ? s.teachers : DEFAULT_ADMIN_DATA.teachers,
    schedule:
      s.schedule && typeof s.schedule === "object"
        ? s.schedule
        : DEFAULT_ADMIN_DATA.schedule,
    pinHash: typeof s.pinHash === "string" && s.pinHash ? s.pinHash : null,
  };
}

/** SHA-256 hex (untuk PIN admin). */
export async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text)
  );
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
