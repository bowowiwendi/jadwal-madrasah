"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Check, Plus, Save, Trash2 } from "lucide-react";

import { DAYS, SUBJECTS, type SubjectKey } from "@/lib/subjects";
import { CLASS_ORDER, type Cell, type Slot } from "@/lib/data";
import { useAppData } from "../AppDataContext";
import ClassTabs from "../ClassTabs";

const SUBJECT_OPTIONS = Object.keys(SUBJECTS) as SubjectKey[];

export default function AdminJadwalSection() {
  const { data, loaded, update } = useAppData();
  const classes = Object.keys(data.schedule);
  const [active, setActive] = useState(classes[0] ?? CLASS_ORDER[0]);
  const [drafts, setDrafts] = useState<Record<string, Slot[]>>(() =>
    Object.fromEntries(
      classes.map((c) => [c, structuredClone(data.schedule[c] ?? [])])
    )
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    setDrafts(
      Object.fromEntries(
        Object.keys(data.schedule).map((c) => [
          c,
          structuredClone(data.schedule[c] ?? []),
        ])
      )
    );
  }, [data.schedule, loaded]);

  const slots = drafts[active] ?? [];

  const setSlot = (i: number, patch: Partial<Slot>) =>
    setDrafts((d) => ({
      ...d,
      [active]: d[active].map((s, j) => (j === i ? { ...s, ...patch } : s)),
    }));

  const setCell = (i: number, day: (typeof DAYS)[number], value: string) => {
    const cell: Cell = value ? (value as SubjectKey) : null;
    setSlot(i, { cells: { ...slots[i].cells, [day]: cell } });
  };

  const toggleBreak = (i: number) => {
    const s = slots[i];
    const willBreak = !s.isBreak;
    const cells = Object.fromEntries(
      DAYS.map((d) => [d, willBreak ? ("Istirahat" as Cell) : (null as Cell)])
    ) as Slot["cells"];
    setSlot(i, { isBreak: willBreak, cells });
  };

  const addSlot = () => {
    const cells = Object.fromEntries(DAYS.map((d) => [d, null])) as Slot["cells"];
    setDrafts((d) => ({
      ...d,
      [active]: [...d[active], { time: "07.15 - 07.50", isBreak: false, cells }],
    }));
  };

  const removeSlot = (i: number) =>
    setDrafts((d) => ({ ...d, [active]: d[active].filter((_, j) => j !== i) }));

  const moveSlot = (i: number, dir: number) => {
    const j = i + dir;
    if (j < 0 || j >= slots.length) return;
    setDrafts((d) => {
      const next = [...d[active]];
      [next[i], next[j]] = [next[j], next[i]];
      return { ...d, [active]: next };
    });
  };

  const save = () => {
    update({ schedule: { ...data.schedule, ...drafts } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const selectCls =
    "w-full min-w-[92px] rounded-lg border border-slate-200 bg-white px-1.5 py-1.5 text-xs text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-100 disabled:text-slate-400";

  return (
    <div className="space-y-4">
      <div>
        <ClassTabs classes={classes} active={active} onChange={setActive} />
      </div>

      <p className="text-xs text-slate-400">
        Mengubah jadwal <b>{active}</b>. Centang &quot;Istirahat&quot; untuk jam
        istirahat (semua hari). Simpan setelah selesai.
      </p>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="min-w-[880px]">
          <div className="grid grid-cols-[150px_90px_repeat(6,minmax(92px,1fr))_44px] border-b border-slate-200 bg-slate-50 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <div className="px-2 py-2.5 text-left">Waktu</div>
            <div className="border-l border-slate-200 px-2 py-2.5">Istirahat</div>
            {DAYS.map((d) => (
              <div key={d} className="border-l border-slate-200 px-2 py-2.5">
                {d}
              </div>
            ))}
            <div className="border-l border-slate-200" />
          </div>

          {slots.map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-[150px_90px_repeat(6,minmax(92px,1fr))_44px] items-center border-b border-slate-100 last:border-b-0"
            >
              <div className="px-2 py-1.5">
                <input
                  value={s.time}
                  onChange={(e) => setSlot(i, { time: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-semibold tabular-nums text-slate-700 outline-none focus:border-indigo-400"
                />
              </div>
              <div className="border-l border-slate-100 px-2 py-1.5 text-center">
                <input
                  type="checkbox"
                  checked={s.isBreak}
                  onChange={() => toggleBreak(i)}
                  className="h-4 w-4 accent-indigo-600"
                />
              </div>
              {DAYS.map((d) => (
                <div key={d} className="border-l border-slate-100 px-1.5 py-1.5">
                  <select
                    value={s.isBreak ? "Istirahat" : (s.cells[d] ?? "")}
                    disabled={s.isBreak}
                    onChange={(e) => setCell(i, d, e.target.value)}
                    className={selectCls}
                  >
                    <option value="">—</option>
                    {SUBJECT_OPTIONS.map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <div className="flex flex-col items-center gap-0.5 border-l border-slate-100 px-1 py-1">
                <button
                  type="button"
                  onClick={() => moveSlot(i, -1)}
                  disabled={i === 0}
                  className="rounded p-0.5 text-slate-400 transition hover:bg-slate-100 disabled:opacity-30"
                  aria-label="Naik"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveSlot(i, 1)}
                  disabled={i === slots.length - 1}
                  className="rounded p-0.5 text-slate-400 transition hover:bg-slate-100 disabled:opacity-30"
                  aria-label="Turun"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => removeSlot(i)}
                  className="rounded p-0.5 text-rose-400 transition hover:bg-rose-50 hover:text-rose-600"
                  aria-label="Hapus jam"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={addSlot}
          className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-500 transition hover:border-indigo-400 hover:text-indigo-600"
        >
          <Plus className="h-4 w-4" />
          Tambah Jam
        </button>
        <button
          type="button"
          onClick={save}
          disabled={!loaded}
          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50"
        >
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? "Tersimpan" : "Simpan Jadwal"}
        </button>
      </div>
    </div>
  );
}
