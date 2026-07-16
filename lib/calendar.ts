/** Gregorian → Julian Day Number (integer, at noon). */
export function gregorianToJDN(y: number, m: number, d: number): number {
  const a = Math.floor((14 - m) / 12);
  const y1 = y + 4800 - a;
  const m1 = m + 12 * a - 3;
  return (
    d +
    Math.floor((153 * m1 + 2) / 5) +
    365 * y1 +
    Math.floor(y1 / 4) -
    Math.floor(y1 / 100) +
    Math.floor(y1 / 400) -
    32045
  );
}

const PASARAN = ["Pon", "Wage", "Kliwon", "Legi", "Pahing"];

/** Hari pasaran (5-hari) Jawa. */
export function getPasaran(date: Date = new Date()): string {
  const j = gregorianToJDN(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
  return PASARAN[(((j % 5) + 3) % 5 + 5) % 5];
}

const INDONESIAN_WEEKDAY = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

export function getIndonesianWeekday(date: Date = new Date()): string {
  return INDONESIAN_WEEKDAY[date.getDay()];
}
