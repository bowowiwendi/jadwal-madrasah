"use client";

import { motion } from "framer-motion";
import { CalendarRange, Shirt, Users, Flag, Dumbbell } from "lucide-react";

import {
  JADWAL_PIKET,
  JADWAL_SERAGAM,
  JADWAL_UPACARA,
  KEGIATAN_JUMAT,
} from "@/lib/school";

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Shirt;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-5 py-3">
        <Icon className="h-4 w-4 text-indigo-600" />
        <h3 className="text-sm font-bold text-slate-700">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="-mx-5 overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
            {headers.map((h) => (
              <th key={h} className="border-b border-slate-200 px-5 py-2 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((r, i) => (
            <tr key={i} className="text-slate-700">
              {r.map((c, j) => (
                <td
                  key={j}
                  className={`px-5 py-2.5 ${j === 0 ? "font-semibold text-slate-900" : ""}`}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function InfoSekolah() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-slate-50 p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm">
          <CalendarRange className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">Info Sekolah</h2>
          <p className="text-sm text-slate-500">
            Jadwal piket, seragam, upacara, &amp; kegiatan Jum&apos;at.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Section icon={Users} title="Jadwal Piket">
          <Table
            headers={["Hari", "Kelas", "Sholat Duha & Duhur", "Salam Sapa"]}
            rows={JADWAL_PIKET.map((p) => [
              p.Hari,
              p.Kelas,
              p["Sholat Duha dan Duhur"],
              p["Salam Sapa"],
            ])}
          />
        </Section>

        <Section icon={Shirt} title="Jadwal Seragam">
          <Table
            headers={["Hari / Waktu", "Pakaian Seragam"]}
            rows={JADWAL_SERAGAM.map((s) => [s["Hari / Waktu"], s["Pakaian Seragam"]])}
          />
        </Section>

        <Section icon={Dumbbell} title="Kegiatan Jum'at">
          <Table
            headers={["Jadwal", "Kegiatan"]}
            rows={KEGIATAN_JUMAT.map((k) => [
              k["Jadwal Olahraga / Kegiatan Jumat"],
              k.Kegiatan,
            ])}
          />
        </Section>

        <Section icon={Flag} title="Jadwal Upacara">
          <Table
            headers={["No", "Hari, Tanggal", "Petugas", "Pembina"]}
            rows={JADWAL_UPACARA.tabel_petugas.map((u) => [
              String(u.No),
              u["Hari, Tanggal"],
              u.Petugas,
              u.Pembina,
            ])}
          />
          <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
            {JADWAL_UPACARA.catatan.map((c, i) => (
              <p key={i} className="flex gap-2 text-xs text-slate-500">
                <span className="text-slate-300">•</span>
                {c}
              </p>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
