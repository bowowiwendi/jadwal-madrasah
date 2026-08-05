"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Check, Plus, Save, Trash2 } from "lucide-react";

import type { SubjectKey } from "@/lib/subjects";
import type { Teacher } from "@/lib/teachers";
import { useAppData } from "../AppDataContext";
import { inputCls } from "./EditableTable";

const SUBJECT_KEYS: SubjectKey[] = [
  "MTK",
  "B.IND",
  "B.ING",
  "PKN",
  "IPAS",
  "PJOK",
  "SBdP",
  "QH",
  "AA",
  "SKI",
  "BTQ",
  "B. Arab",
  "B. Jawa",
  "Fiqih",
];

interface GuruDraft extends Teacher {}

export default function AdminGuruSection() {
  const { data, loaded, update } = useAppData();
  const classOptions = Object.keys(data.schedule).map((k) =>
    k.replace("KELAS ", "")
  );
  const [draft, setDraft] = useState<GuruDraft[]>(() =>
    data.teachers.map((t) => ({ ...t, classes: [...t.classes] }))
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    setDraft(data.teachers.map((t) => ({ ...t, classes: [...t.classes] })));
  }, [data.teachers, loaded]);

  const setTeacher = (i: number, patch: Partial<GuruDraft>) =>
    setDraft((d) => d.map((t, j) => (j === i ? { ...t, ...patch } : t)));

  const toggleClass = (i: number, cls: string) => {
    const t = draft[i];
    const has = t.classes.includes(cls);
    setTeacher(
      i,
      has
        ? { classes: t.classes.filter((c) => c !== cls) }
        : { classes: [...t.classes, cls] }
    );
  };

  const toggleSubj = (
    i: number,
    key: SubjectKey,
    field: "subjects" | "except" | "extra"
  ) => {
    const t = draft[i];
    const list = t[field] ?? [];
    const has = list.includes(key);
    setTeacher(
      i,
      has
        ? { [field]: list.filter((s) => s !== key) }
        : { [field]: [...list, key] }
    );
  };

  const addTeacher = () =>
    setDraft((d) => [
      ...d,
      { id: Math.max(0, ...d.map((t) => t.id)) + 1, name: "", classes: [] },
    ]);

  const removeTeacher = (i: number) =>
    setDraft((d) => d.filter((_, j) => j !== i));

  const move = (i: number, dir: number) => {
    const j = i + dir;
    if (j < 0 || j >= draft.length) return;
    setDraft((d) => {
      const next = [...d];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  const save = () => {
    update({ teachers: draft });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const chip = (active: boolean) =>
    [
      "rounded-lg border px-2.5 py-1 text-xs font-semibold transition",
      active
        ? "border-indigo-300 bg-indigo-50 text-indigo-700"
        : "border-slate-200 bg-white text-slate-500 hover:border-slate-300",
    ].join(" ");

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-400">
        {draft.length} guru terdaftar. Ubah nama, kelas pengampu, dan mata pelajaran,
        lalu tekan Simpan.
      </p>

      {draft.map((t, i) => (
        <div
          key={t.id}
          className="rounded-2xl border border-slate-200 bg-white p-4"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Nama Guru
              </label>
              <input
                value={t.name}
                onChange={(e) => setTeacher(i, { name: e.target.value })}
                placeholder="Nama guru…"
                className={`${inputCls} mt-1 px-3 py-2 text-sm font-semibold`}
              />
            </div>
            <div className="flex shrink-0 items-center gap-1 pt-5">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 disabled:opacity-30"
                aria-label="Naik"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === draft.length - 1}
                className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 disabled:opacity-30"
                aria-label="Turun"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => removeTeacher(i)}
                className="rounded-md p-1.5 text-rose-400 transition hover:bg-rose-50 hover:text-rose-600"
                aria-label="Hapus guru"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-3">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Kelas Pengampu
            </p>
            <div className="flex flex-wrap gap-1.5">
              {classOptions.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleClass(i, c)}
                  className={chip(t.classes.includes(c))}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Mata Pelajaran
            </p>
            <div className="mb-2 flex gap-2">
              <button
                type="button"
                onClick={() => setTeacher(i, { subjectsAll: true })}
                className={chip(t.subjectsAll === true)}
              >
                Semua Mapel
              </button>
              <button
                type="button"
                onClick={() => setTeacher(i, { subjectsAll: false })}
                className={chip(t.subjectsAll !== true)}
              >
                Mapel Tertentu
              </button>
            </div>
            {t.subjectsAll ? (
              <div className="space-y-2">
                <div>
                  <p className="mb-1 text-[11px] text-slate-400">
                    Dikecualikan (tidak diampu)
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUBJECT_KEYS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleSubj(i, s, "except")}
                        className={chip((t.except ?? []).includes(s))}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-[11px] text-slate-400">Tambahan</p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUBJECT_KEYS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleSubj(i, s, "extra")}
                        className={chip((t.extra ?? []).includes(s))}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {SUBJECT_KEYS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSubj(i, s, "subjects")}
                    className={chip((t.subjects ?? []).includes(s))}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-3">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Catatan (opsional)
            </label>
            <input
              value={t.note ?? ""}
              onChange={(e) => setTeacher(i, { note: e.target.value })}
              placeholder="mis. PKN (6B)"
              className={`${inputCls} mt-1 px-3 py-2`}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addTeacher}
        className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-500 transition hover:border-indigo-400 hover:text-indigo-600"
      >
        <Plus className="h-4 w-4" />
        Tambah Guru
      </button>

      <div>
        <button
          type="button"
          onClick={save}
          disabled={!loaded}
          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50"
        >
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? "Tersimpan" : "Simpan Data Guru"}
        </button>
      </div>
    </div>
  );
}
