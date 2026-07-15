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

export interface Doa {
  name: string;
  arabic: string;
  latin: string;
  arti: string;
}

/** Urutan doa dalam sholat, dari Takbiratul Ikhram hingga Tasyahud Akhir. */
export const SHOLAT_DOA: Doa[] = [
  {
    name: "Doa Takbiratul Ikhram (Iftitah)",
    arabic:
      "سُبْحَانَكَ اللّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلاَ إِلَهَ غَيْرُكَ",
    latin:
      "Subhanaka Allahumma wa bihamdika wa tabarakasmuka wa ta'ala jadduka wa laa ilaha ghairuk",
    arti:
      "Maha Suci Engkau ya Allah, segala puji bagi-Mu, Maha Berkah nama-Mu, Maha Tinggi keagungan-Mu, dan tiada ilah (sembahan) yang berhak disembah selain Engkau.",
  },
  {
    name: "Doa Ruku'",
    arabic: "سُبْحَانَ رَبِّيَ الْعَظِيْمِ",
    latin: "Subhana Rabbiyal 'Adzim",
    arti: "Maha Suci Tuhanku Yang Maha Agung.",
  },
  {
    name: "Doa I'tidal",
    arabic:
      "سَمِعَ اللّهُ لِمَنْ حَمِدَهُ، اللّهُمَّ رَبَّنَا وَلَكَ الْحَمْدُ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ",
    latin:
      "Sami'allahu liman hamidah, Allahumma Rabbanaa wa lakal hamdu hamdan katsiran thayyiban mubaarakan fiih",
    arti:
      "Allah mendengar orang yang memuji-Nya. Ya Tuhan kami, segala puji bagi-Mu dengan pujian yang banyak, baik, dan penuh berkah.",
  },
  {
    name: "Doa Sujud",
    arabic:
      "سُبْحَانَ رَبِّيَ الْأَعْلَى (٣×). اَللّهُمَّ اغْفِرْ لِيْ ذَنْبِيْ كُلَّهُ دِقَّهُ وَجِلَّهُ وَأَوَّلَهُ وَآخِرَهُ وَعَلَانِيَتَهُ وَسِرَّهُ",
    latin:
      "Subhana Rabbiyal A'la (3x). Allahummaghfirli dzambi kullahu diqqahu wa jillahu wa awwalahu wa aakhirahu wa 'alaaniyatahu wa sirrahu",
    arti:
      "Maha Suci Tuhanku Yang Maha Tinggi (3x). Ya Allah, ampunilah dosaku seluruhnya, yang kecil maupun besar, yang awal maupun akhir, yang terang-terangan maupun tersembunyi.",
  },
  {
    name: "Doa Duduk Antara Dua Sujud",
    arabic:
      "اَللّهُمَّ اغْفِرْ لِيْ وَارْحَمْنِيْ وَاجْبُرْنِيْ وَارْفَعْنِيْ وَارْزُقْنِيْ وَاهْدِنِيْ وَعَافِنِيْ وَاعْفُ عَنِّيْ",
    latin:
      "Allahummaghfir li, warhamni, wajburni, warfa'ni, warzuqni, wahdini, wa 'afini, wa'fu 'anni",
    arti:
      "Ya Allah, ampunilah aku, kasihanilah aku, perbaikilah urusanku, angkatlah derajatku, berilah rezeki kepadaku, berilah petunjuk kepadaku, sehatkanlah aku, dan maafkanlah aku.",
  },
  {
    name: "Doa Tasyahud Awal",
    arabic:
      "اَلتَّحِيَّاتُ لِلّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلاَمُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللّهِ وَبَرَكَاتُهُ، السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِ اللّهِ الصَّالِحِيْنَ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُوْلُ اللّهِ",
    latin:
      "Attahiyyatu lillahi wasshalawatu wattayyibatu, assalamu 'alaika ayyuhan nabiyyu wa rahmatullahi wa barakatuh, assalamu 'alaina wa 'ala 'ibadillahis shalihin, asyhadu an laa ilaha illallah wa asyhadu anna Muhammadar rasulullah",
    arti:
      "Segala penghormatan, shalat, dan kebaikan adalah milik Allah. Semoga keselamatan, rahmat, dan keberkahan tercurah kepadamu wahai Nabi. Semoga keselamatan tercurah kepada kami dan kepada hamba-hamba Allah yang shalih. Aku bersaksi bahwa tiada Tuhan selain Allah, dan aku bersaksi bahwa Muhammad adalah utusan Allah.",
  },
  {
    name: "Doa Tasyahud Akhir & Sholawat",
    arabic:
      "اَلتَّحِيَّاتُ لِلّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلاَمُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللّهِ وَبَرَكَاتُهُ، السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِ اللّهِ الصَّالِحِيْنَ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُوْلُ اللّهِ. اَللّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيْمَ وَعَلَى آلِ إِبْرَاهِيْمَ، إِنَّكَ حَمِيْدٌ مَجِيْدٌ، اَللّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيْمَ وَعَلَى آلِ إِبْرَاهِيْمَ، إِنَّكَ حَمِيْدٌ مَجِيْدٌ",
    latin:
      "Attahiyyatu lillahi wasshalawatu wattayyibatu, assalamu 'alaika ayyuhan nabiyyu wa rahmatullahi wa barakatuh, assalamu 'alaina wa 'ala 'ibadillahis shalihin, asyhadu an laa ilaha illallah wa asyhadu anna Muhammadar rasulullah. Allahumma salli 'ala Muhammad wa 'ala ali Muhammad kama sallaita 'ala Ibrahim wa 'ala ali Ibrahim, innaka hamidun majid. Allahumma barik 'ala Muhammad wa 'ala ali Muhammad kama barakta 'ala Ibrahim wa 'ala ali Ibrahim, innaka hamidun majid",
    arti:
      "Segala penghormatan, shalat, dan kebaikan adalah milik Allah. Semoga keselamatan, rahmat, dan keberkahan tercurah kepadamu wahai Nabi, dan kepada kami serta hamba-hamba Allah yang shalih. Aku bersaksi tiada Tuhan selain Allah dan Muhammad adalah utusan-Nya. Ya Allah, limpahkanlah shalawat kepada Muhammad dan keluarganya sebagaimana Engkau melimpahkan shalawat kepada Ibrahim dan keluarganya. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia. Ya Allah, berkahilah Muhammad dan keluarganya sebagaimana Engkau memberkahi Ibrahim dan keluarganya. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.",
  },
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
