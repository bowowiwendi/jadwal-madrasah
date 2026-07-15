export interface Surah {
  no: number;
  name: string;
  /** Long surahs occupy their own day; short surahs are grouped (up to 3/day). */
  long: boolean;
}

export const JUZ_AMMA: Surah[] = [
  { no: 1, name: "Al-Fatihah", long: true },
  { no: 78, name: "An-Naba'", long: true },
  { no: 79, name: "An-Nazi'at", long: true },
  { no: 80, name: "'Abasa", long: true },
  { no: 81, name: "At-Takwir", long: false },
  { no: 82, name: "Al-Infitar", long: false },
  { no: 83, name: "Al-Mutaffifin", long: true },
  { no: 84, name: "Al-Inshiqaq", long: false },
  { no: 85, name: "Al-Buruj", long: false },
  { no: 86, name: "At-Tariq", long: false },
  { no: 87, name: "Al-A'la", long: false },
  { no: 88, name: "Al-Ghashiyah", long: false },
  { no: 89, name: "Al-Fajr", long: true },
  { no: 90, name: "Al-Balad", long: false },
  { no: 91, name: "Ash-Shams", long: false },
  { no: 92, name: "Al-Lail", long: false },
  { no: 93, name: "Ad-Duha", long: false },
  { no: 94, name: "Ash-Sharh", long: false },
  { no: 95, name: "At-Tin", long: false },
  { no: 96, name: "Al-'Alaq", long: false },
  { no: 97, name: "Al-Qadr", long: false },
  { no: 98, name: "Al-Bayyinah", long: false },
  { no: 99, name: "Az-Zalzalah", long: false },
  { no: 100, name: "Al-'Adiyat", long: false },
  { no: 101, name: "Al-Qari'ah", long: false },
  { no: 102, name: "At-Takathur", long: false },
  { no: 103, name: "Al-'Asr", long: false },
  { no: 104, name: "Al-Humazah", long: false },
  { no: 105, name: "Al-Fil", long: false },
  { no: 106, name: "Quraish", long: false },
  { no: 107, name: "Al-Ma'un", long: false },
  { no: 108, name: "Al-Kawthar", long: false },
  { no: 109, name: "Al-Kafirun", long: false },
  { no: 110, name: "An-Nasr", long: false },
  { no: 111, name: "Al-Masad", long: false },
  { no: 112, name: "Al-Ikhlas", long: false },
  { no: 113, name: "Al-Falaq", long: false },
  { no: 114, name: "An-Nas", long: false },
];

export const PRE_READING = [
  "Asmaul Husna",
  "Doa-doa dalam Sholat",
] as const;

/** Urutan doa dalam sholat, dari Takbiratul Ikhram hingga Tasyahud Akhir. */
export const SHOLAT_DOA: string[] = [
  "Doa Takbiratul Ikhram",
  "Doa Iftitah",
  "Doa Ruku'",
  "Doa I'tidal",
  "Doa Sujud",
  "Doa Duduk Antara Dua Sujud",
  "Doa Tasyahud Awal",
  "Doa Tasyahud Akhir",
];

export interface DayPlan {
  surahs: Surah[];
}

/**
 * Builds the rolling reading plan:
 *  - long surahs → their own day
 *  - short surahs → grouped up to 3 per day
 */
export function buildDays(surahs: Surah[]): DayPlan[] {
  const days: DayPlan[] = [];
  let buffer: Surah[] = [];

  for (const s of surahs) {
    if (s.long) {
      if (buffer.length) {
        days.push({ surahs: buffer });
        buffer = [];
      }
      days.push({ surahs: [s] });
    } else {
      buffer.push(s);
      if (buffer.length === 3) {
        days.push({ surahs: buffer });
        buffer = [];
      }
    }
  }
  if (buffer.length) days.push({ surahs: buffer });

  return days;
}
