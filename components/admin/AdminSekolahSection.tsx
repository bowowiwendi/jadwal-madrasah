"use client";

import { useEffect, useState } from "react";
import { Check, Save } from "lucide-react";

import type { KegiatanJumat, Piket, Seragam, Upacara } from "@/lib/school";
import { useAppData } from "../AppDataContext";
import EditableTable from "./EditableTable";

interface Draft {
  piket: Piket[];
  seragam: Seragam[];
  upacara: Upacara[];
  upacaraCatatan: string[];
  kegiatanJumat: KegiatanJumat[];
  petugas: Record<string, string>;
}

export default function AdminSekolahSection() {
  const { data, loaded, update } = useAppData();
  const [draft, setDraft] = useState<Draft>(() => ({
    piket: data.piket.map((p) => ({ ...p })),
    seragam: data.seragam.map((s) => ({ ...s })),
    upacara: data.upacara.map((u) => ({ ...u })),
    upacaraCatatan: [...data.upacaraCatatan],
    kegiatanJumat: data.kegiatanJumat.map((k) => ({ ...k })),
    petugas: { ...data.petugasPembiasaan },
  }));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    setDraft({
      piket: data.piket.map((p) => ({ ...p })),
      seragam: data.seragam.map((s) => ({ ...s })),
      upacara: data.upacara.map((u) => ({ ...u })),
      upacaraCatatan: [...data.upacaraCatatan],
      kegiatanJumat: data.kegiatanJumat.map((k) => ({ ...k })),
      petugas: { ...data.petugasPembiasaan },
    });
  }, [data, loaded]);

  const setPiket = (rows: string[][]) =>
    setDraft((d) => ({
      ...d,
      piket: rows.map((r) => ({
        Hari: r[0] ?? "",
        Kelas: r[1] ?? "",
        "Sholat Duha dan Duhur": r[2] ?? "",
        "Salam Sapa": r[3] ?? "",
      })),
    }));

  const setSeragam = (rows: string[][]) =>
    setDraft((d) => ({
      ...d,
      seragam: rows.map((r) => ({
        "Hari / Waktu": r[0] ?? "",
        "Pakaian Seragam": r[1] ?? "",
      })),
    }));

  const setUpacara = (rows: string[][]) =>
    setDraft((d) => ({
      ...d,
      upacara: rows.map((r) => ({
        No: Number(r[0]) || 0,
        "Hari, Tanggal": r[1] ?? "",
        Petugas: r[2] ?? "",
        Pembina: r[3] ?? "",
      })),
    }));

  const setCatatan = (rows: string[][]) =>
    setDraft((d) => ({ ...d, upacaraCatatan: rows.map((r) => r[0] ?? "") }));

  const setKegiatan = (rows: string[][]) =>
    setDraft((d) => ({
      ...d,
      kegiatanJumat: rows.map((r) => ({
        "Jadwal Olahraga / Kegiatan Jumat": r[0] ?? "",
        Kegiatan: r[1] ?? "",
      })),
    }));

  const setPetugas = (rows: string[][]) =>
    setDraft((d) => ({
      ...d,
      petugas: Object.fromEntries(rows.map((r) => [r[0] ?? "", r[1] ?? ""])),
    }));

  const save = () => {
    update({
      piket: draft.piket,
      seragam: draft.seragam,
      upacara: draft.upacara,
      upacaraCatatan: draft.upacaraCatatan,
      kegiatanJumat: draft.kegiatanJumat,
      petugasPembiasaan: draft.petugas,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const box = "rounded-2xl border border-slate-200 bg-white p-5";

  return (
    <div className="space-y-6">
      <div className={box}>
        <h4 className="mb-1 text-sm font-bold text-slate-700">Jadwal Piket</h4>
        <p className="mb-3 text-xs text-slate-400">
          Kolom: Hari, Kelas, Sholat Duha &amp; Duhur, Salam Sapa.
        </p>
        <EditableTable
          headers={["Hari", "Kelas", "Sholat Duha & Duhur", "Salam Sapa"]}
          rows={draft.piket.map((p) => [
            p.Hari,
            p.Kelas,
            p["Sholat Duha dan Duhur"],
            p["Salam Sapa"],
          ])}
          onChange={setPiket}
        />
      </div>

      <div className={box}>
        <h4 className="mb-1 text-sm font-bold text-slate-700">Jadwal Seragam</h4>
        <p className="mb-3 text-xs text-slate-400">
          Baris &quot;Rabu 1..5&quot;, &quot;Jumat 1..4&quot;, &quot;Kliwon 1..5&quot; menjadi
          daftar giliran otomatis (dipakai untuk seragam hari ini).
        </p>
        <EditableTable
          headers={["Hari / Waktu", "Pakaian Seragam"]}
          rows={draft.seragam.map((s) => [s["Hari / Waktu"], s["Pakaian Seragam"]])}
          onChange={setSeragam}
        />
      </div>

      <div className={box}>
        <h4 className="mb-1 text-sm font-bold text-slate-700">Jadwal Upacara</h4>
        <p className="mb-3 text-xs text-slate-400">
          Tanggal memakai format: Senin, 27 07 2026 (agar dikenali otomatis).
        </p>
        <EditableTable
          headers={["No", "Hari, Tanggal", "Petugas", "Pembina"]}
          rows={draft.upacara.map((u) => [
            String(u.No),
            u["Hari, Tanggal"],
            u.Petugas,
            u.Pembina,
          ])}
          onChange={setUpacara}
        />
        <h5 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
          Catatan Upacara
        </h5>
        <EditableTable
          headers={["Catatan"]}
          rows={draft.upacaraCatatan.map((c) => [c])}
          onChange={setCatatan}
          colCount={1}
        />
      </div>

      <div className={box}>
        <h4 className="mb-1 text-sm font-bold text-slate-700">Kegiatan Jum&apos;at</h4>
        <p className="mb-3 text-xs text-slate-400">
          Baris &quot;Jumat 1..&quot; dipakai bergilir; baris &quot;Jumat Kliwon&quot; untuk
          Jumat Kliwon.
        </p>
        <EditableTable
          headers={["Jadwal", "Kegiatan"]}
          rows={draft.kegiatanJumat.map((k) => [
            k["Jadwal Olahraga / Kegiatan Jumat"],
            k.Kegiatan,
          ])}
          onChange={setKegiatan}
        />
      </div>

      <div className={box}>
        <h4 className="mb-1 text-sm font-bold text-slate-700">Petugas Pembiasaan Pagi</h4>
        <p className="mb-3 text-xs text-slate-400">Kelas petugas per hari.</p>
        <EditableTable
          headers={["Hari", "Kelas Petugas"]}
          rows={Object.entries(draft.petugas).map(([hari, kelas]) => [hari, kelas])}
          onChange={setPetugas}
        />
      </div>

      <button
        type="button"
        onClick={save}
        disabled={!loaded}
        className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50"
      >
        {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
        {saved ? "Tersimpan" : "Simpan Data Sekolah"}
      </button>
    </div>
  );
}
