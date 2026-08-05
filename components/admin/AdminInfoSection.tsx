"use client";

import { useEffect, useState } from "react";
import { Check, KeyRound, RotateCcw, Save, ShieldCheck } from "lucide-react";

import { sha256Hex } from "@/lib/adminData";
import { useAppData } from "../AppDataContext";
import { inputCls } from "./EditableTable";

const fieldCls = `${inputCls} px-3 py-2`;

export default function AdminInfoSection() {
  const { data, loaded, update, reset } = useAppData();
  const [draft, setDraft] = useState(data.info);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (loaded) setDraft(data.info);
  }, [data.info, loaded]);

  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinMsg, setPinMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busyPin, setBusyPin] = useState(false);

  const saveInfo = () => {
    update({ info: draft });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const savePin = async () => {
    setPinMsg(null);
    if (newPin && newPin !== confirmPin) {
      setPinMsg({ ok: false, text: "PIN dan konfirmasi tidak sama." });
      return;
    }
    setBusyPin(true);
    try {
      update({ pinHash: newPin ? await sha256Hex(newPin) : null });
      setPinMsg({
        ok: true,
        text: newPin ? "PIN berhasil diatur." : "PIN dihapus.",
      });
      setNewPin("");
      setConfirmPin("");
    } catch {
      setPinMsg({ ok: false, text: "Gagal menyimpan PIN." });
    } finally {
      setBusyPin(false);
    }
  };

  const doReset = () => {
    if (
      window.confirm(
        "Kembalikan SEMUA data (info, piket, seragam, upacara, guru, jadwal) ke bawaan? Perubahan Anda akan hilang."
      )
    ) {
      reset();
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h4 className="mb-1 text-sm font-bold text-slate-700">Informasi Umum Madrasah</h4>
        <p className="mb-4 text-xs text-slate-400">
          Ditampilkan di header dan footer aplikasi.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block text-xs font-semibold text-slate-500">
            Nama Madrasah
            <input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              className={`${fieldCls} mt-1`}
            />
          </label>
          <label className="block text-xs font-semibold text-slate-500">
            Tagline / Judul Kecil
            <input
              value={draft.tagline}
              onChange={(e) => setDraft({ ...draft, tagline: e.target.value })}
              className={`${fieldCls} mt-1`}
            />
          </label>
          <label className="block text-xs font-semibold text-slate-500">
            Tahun Ajaran
            <input
              value={draft.year}
              onChange={(e) => setDraft({ ...draft, year: e.target.value })}
              className={`${fieldCls} mt-1`}
            />
          </label>
          <label className="block text-xs font-semibold text-slate-500">
            Teks Footer
            <input
              value={draft.footer}
              onChange={(e) => setDraft({ ...draft, footer: e.target.value })}
              className={`${fieldCls} mt-1`}
            />
          </label>
        </div>
        <button
          type="button"
          onClick={saveInfo}
          disabled={!loaded}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50"
        >
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? "Tersimpan" : "Simpan Informasi"}
        </button>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h4 className="mb-1 flex items-center gap-1.5 text-sm font-bold text-slate-700">
          <KeyRound className="h-4 w-4 text-indigo-600" />
          Kunci PIN Admin
        </h4>
        <p className="mb-4 text-xs text-slate-400">
          Jika PIN diatur, panel admin hanya bisa dibuka setelah memasukkan PIN.
          {data.pinHash && (
            <span className="ml-1 inline-flex items-center gap-1 font-semibold text-emerald-600">
              <ShieldCheck className="h-3.5 w-3.5" /> PIN aktif
            </span>
          )}
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block text-xs font-semibold text-slate-500">
            PIN Baru
            <input
              type="password"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              placeholder="Kosongkan untuk menghapus PIN"
              className={`${fieldCls} mt-1`}
            />
          </label>
          <label className="block text-xs font-semibold text-slate-500">
            Konfirmasi PIN
            <input
              type="password"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              className={`${fieldCls} mt-1`}
            />
          </label>
        </div>
        {pinMsg && (
          <p
            className={`mt-2 text-xs font-semibold ${
              pinMsg.ok ? "text-emerald-600" : "text-rose-500"
            }`}
          >
            {pinMsg.text}
          </p>
        )}
        <button
          type="button"
          onClick={savePin}
          disabled={busyPin}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-900 disabled:opacity-50"
        >
          <ShieldCheck className="h-4 w-4" />
          Simpan PIN
        </button>
      </section>

      <section className="rounded-2xl border border-rose-200 bg-rose-50/50 p-5">
        <h4 className="mb-1 text-sm font-bold text-rose-700">Reset Data</h4>
        <p className="mb-4 text-xs text-rose-500">
          Mengembalikan seluruh data ke bawaan awal. Tindakan ini tidak bisa dibatalkan.
        </p>
        <button
          type="button"
          onClick={doReset}
          className="inline-flex items-center gap-1.5 rounded-lg border border-rose-300 bg-white px-4 py-2 text-sm font-semibold text-rose-600 shadow-sm transition hover:bg-rose-50"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Semua Data
        </button>
      </section>
    </div>
  );
}
