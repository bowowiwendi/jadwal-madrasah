import { gregorianToJDN } from "./calendar";

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

export interface DayPlan {
  surahs: Surah[];
}

/**
 * Builds the rolling reading plan:
 *  - long surahs occupy their own day
 *  - short surahs are grouped up to 3 per day
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

export const PRE_READING = [
  "Asmaul Husna",
  "Doa-doa dalam Sholat",
] as const;

export interface TodayRoutine {
  /** Hari ke-berapa dalam siklus Juz 'Amma (mundur). */
  index: number;
  total: number;
  /** Bacaan pembuka selang-seling untuk hari ini. */
  preReading: string;
  /** Surah Juz 'Amma yang dibaca hari ini. */
  surahs: Surah[];
}

/** Menentukan pembiasaan pagi yang jatuh pada hari ini (deterministik per tanggal). */
export function getTodayRoutine(
  preReading: readonly string[] = PRE_READING,
  date: Date = new Date()
): TodayRoutine {
  const days = buildDays([...JUZ_AMMA].reverse());
  const total = days.length;
  const j = gregorianToJDN(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
  const index = ((j % total) + total) % total;
  const list = preReading.length ? preReading : PRE_READING;
  return {
    index,
    total,
    preReading: list[index % list.length],
    surahs: days[index].surahs,
  };
}

export interface Doa {
  name: string;
  arabic: string;
  latin: string;
  arti: string;
}

/** Urutan doa dalam sholat, dari Takbiratul Ikhram hingga Tasyahud Akhir
 *  (sumber: Risalah Tuntunan Shalat Lengkap, Drs. Moh. Rifa'i). */
export const SHOLAT_DOA: Doa[] = [
  {
    name: "Takbiratul Ikhram",
    arabic: "اللهُ أَكْبَرُ",
    latin: "Allahu Akbar",
    arti: "Allah Maha Besar.",
  },
  {
    name: "Do'a Iftitah",
    arabic:
      "اللهُ اكْبَرْ كَبِيرًا وَالحَمْدُ لِلّهِ كَثِيرًا وَسُبْحَانَ اللّهِ بُكْرَةً وَأَصِيلًا إِنّي وَجْهْتُ وَجْهِيَ لِلّذِي فَطَرَ السَّمَوَاتِ وَالأَرْضَ حَنِيفًا مُسْلِمًا وَمَا أَنَا مِنَ المُشْرِكِينَ . إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَامِي لِلّهِ رَبِّ العَالَمِينَ لَا شَرِيكَ لَهُ وَبِذَلِكَ أُمِرْتُ وَأَنَا مِنَ المُسْلِمِينَ .",
    latin:
      "Allahu akbar kabiran wa alhamdu lillahi katsiran wa subhanallahi bukratan wa asila. Innii wajahtu wajhiya lilladzii fatharos samaawaati wal ardha haniiifan musliman wa maa anaa min al musyrikiin. Inna shalaatii wa nusukii wa mahyaaya wa maamaati lillaahi rabbil 'aalamiina laa syariika lahu wa bidzalika umirtu wa anaa min al muslimiin.",
    arti:
      "Allah Maha Besar dengan segala kebesaran, segala puji bagi Allah dengan puji yang banyak, dan Maha Suci Allah di waktu pagi dan petang. Sesungguhnya aku menghadapkan wajahku kepada (Allah) Yang menciptakan langit dan bumi dengan lurus lagi tunduk (islam), dan aku bukanlah termasuk orang-orang musyrik. Sesungguhnya shalatku, ibadahku, hidupku, dan matiku hanyalah untuk Allah Tuhan semesta alam, tiada sekutu bagi-Nya, dan dengan demikian itu aku diperintahkan, dan aku termasuk orang-orang yang berserah diri.",
  },
  {
    name: "Surat Al-Fatihah",
    arabic:
      "بسم الله الرحمن الرحيم الْحَمْدُ لِلّهِ رَبِّ العَالَمِينَ الرَّحْمَنِ الرَّحِيمِ. مَالِكِ يَوْمِ الدّينِ. إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ. اهْدِنَا الصّرَاطَ المُسْتَقِيمَ . صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ المَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالّينَ . آمِينَ .",
    latin:
      "Bismillahir rahmanir rahiim. Alhamdu lillaahi rabbil 'aalamiina arrahmanir rahiim. Maaliki yawmid diin. Iyyaaka na'budu wa iyyaaka nasta'iin. Ihdinash shiratal mustaqiim. Shiratal lazina an'amta 'alaihim ghairil maghdhuubi 'alaihim wa lad dhaalliin. Aamiin.",
    arti:
      "Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah Tuhan semesta alam, Yang Maha Pengasih lagi Maha Penyayang, Pemilik hari pembalasan. Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan. Tunjukilah kami jalan yang lurus, (yaitu) jalan orang-orang yang telah Engkau beri nikmat, bukan (jalan) mereka yang dimurkai dan bukan pula (jalan) mereka yang sesat. Aamiin.",
  },
  {
    name: "Ruku'",
    arabic: "سُبْحَانَ رَبِّيَ العَظِيمِ وَبِحَمْدِهِ ٣",
    latin: "Subhana rabbiyal 'adzimi wa bihamdih (3x)",
    arti:
      "Maha Suci Tuhanku Yang Maha Agung beserta segala puji bagi-Nya. (dibaca 3 kali)",
  },
  {
    name: "I'tidal",
    arabic:
      "سَمِعَ اللهُ لِمَنْ حَمِدَهُ رَبَّنَا لَكَ الحَمْدُ مِنَ السَّمَوَاتِ وَمِنَ الأَرْضِ وَمِنْ مَا شِئْتَ مِنْ شَيْءٍ بَعْدُ .",
    latin:
      "Sami'allahu liman hamidah. Rabbanaa laka alhamdu minas samaawaati wa minal ardhi wa min maa shi'ta min syai'in ba'du.",
    arti:
      "Allah mendengar orang yang memuji-Nya. Ya Tuhan kami, bagi-Mulah segala puji di langit, di bumi, dan di mana saja yang Engkau kehendaki setelah itu.",
  },
  {
    name: "Sujud",
    arabic: "سُبْحَانَ رَبِّيَ الأَعْلَى وَبِحَمْدِهِ ٣",
    latin: "Subhana rabbiyal a'laa wa bihamdih (3x)",
    arti:
      "Maha Suci Tuhanku Yang Maha Tinggi beserta segala puji bagi-Nya. (dibaca 3 kali)",
  },
  {
    name: "Duduk Antara Dua Sujud",
    arabic:
      "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَارْفَعْنِي وَارْزُقْنِي وَاهْدِنِي وَعَافِنِي وَاعْفُ عَنّي .",
    latin:
      "Rabbighfir lii warhamnii wajburnii warfa'nii warzuqnii wahdinii wa 'aafinii wa'fu 'annii.",
    arti:
      "Ya Tuhanku, ampunilah aku, kasihanilah aku, perbaikilah urusanku, angkatlah derajatku, berilah rezeki kepadaku, tunjukilah aku, sehatkanlah aku, dan maafkanlah aku.",
  },
  {
    name: "Tasyahud (Tahyat) Awal",
    arabic:
      "التَّحِيَّاتُ المُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلّهِ. السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ. السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللهِ الصَّالِحِينَ . أَشْهَدُ انْ لَا إِلَهَ إِلَّا اللَّهُ، وَ اشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهُ. اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ.",
    latin:
      "At-tahiyyaatul mubaarakaatus shalaawaatuth thayyibaatu lillah. Assalaamu 'alaika ayyuhan nabiyyu wa rahmatullahi wa barakaatuh. Assalaamu 'alainaa wa 'alaa 'ibaadillahish shaalihiin. Asyhadu an laa ilaaha illallah, wa asyhadu anna Muhammadar rasulullah. Allahumma sholli 'alaa sayyidinaa Muhammad.",
    arti:
      "Segala penghormatan, keberkahan, shalat, dan kebaikan hanyalah milik Allah. Semoga keselamatan, rahmat, dan keberkahan tercurah kepadamu wahai Nabi. Semoga keselamatan tercurah kepada kami dan kepada hamba-hamba Allah yang shalih. Aku bersaksi bahwa tiada Tuhan selain Allah, dan aku bersaksi bahwa Muhammad adalah utusan Allah. Ya Allah, limpahkanlah shalawat kepada junjungan kami Muhammad.",
  },
  {
    name: "Tasyahud (Tahyat) Akhir",
    arabic:
      "وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ . كَمَا صَلَّيْتَ عَلَى سَيِّدِنَا إِبْرَاهِيمَ وَعَلَى آلِ سَيِّدِنَا إِبْرَاهِيمَ. وَبَارِكْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ . كَمَا بَارَكْتَ عَلَى سَيِّدِنَا إِبْرَاهِيمَ وَعَلَى آلِ سَيِّدِنَا إِبْرَاهِيمَ فِي العَالَمِينَ إِنَّكَ حَمِيدٌ مَجِيدٌ .",
    latin:
      "Wa 'alaa aali sayyidinaa Muhammad. Kamaa shallaita 'alaa sayyidinaa Ibraahiima wa 'alaa aali sayyidinaa Ibraahiima. Wa baarik 'alaa sayyidinaa Muhammad wa 'alaa aali sayyidinaa Muhammad. Kamaa baarakta 'alaa sayyidinaa Ibraahiima wa 'alaa aali sayyidinaa Ibraahiima fii al'aalamiina innaka hamidun majiid.",
    arti:
      "Dan kepada keluarga junjungan kami Muhammad. Sebagaimana Engkau telah limpahkan shalawat kepada junjungan kami Ibrahim dan keluarga junjungan kami Ibrahim. Dan berkahilah junjungan kami Muhammad dan keluarga junjungan kami Muhammad. Sebagaimana Engkau telah berkahi junjungan kami Ibrahim dan keluarga junjungan kami Ibrahim di seluruh alam. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.",
  },
];
