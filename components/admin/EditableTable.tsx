"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

interface EditableTableProps {
  headers: string[];
  rows: string[][];
  onChange: (rows: string[][]) => void;
  /** Jumlah kolom (baris baru memakai jumlah ini). Default = headers.length. */
  colCount?: number;
}

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

export default function EditableTable({
  headers,
  rows,
  onChange,
  colCount,
}: EditableTableProps) {
  const cols = colCount ?? headers.length;

  const setCell = (ri: number, ci: number, value: string) => {
    const next = rows.map((r, i) =>
      i === ri ? r.map((c, j) => (j === ci ? value : c)) : r
    );
    onChange(next);
  };

  const addRow = () => onChange([...rows, Array(cols).fill("")]);
  const removeRow = (ri: number) => onChange(rows.filter((_, i) => i !== ri));
  const move = (ri: number, dir: number) => {
    const j = ri + dir;
    if (j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[ri], next[j]] = [next[j], next[ri]];
    onChange(next);
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400">
              {headers.map((h) => (
                <th key={h} className="border-b border-slate-200 px-2.5 py-2 font-semibold">
                  {h}
                </th>
              ))}
              <th className="border-b border-slate-200 px-2 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r, ri) => (
              <tr key={ri}>
                {headers.map((h, ci) => (
                  <td key={h} className="px-2.5 py-1.5 align-middle">
                    <input
                      value={r[ci] ?? ""}
                      onChange={(e) => setCell(ri, ci, e.target.value)}
                      className={inputCls}
                    />
                  </td>
                ))}
                <td className="px-1.5 py-1.5">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => move(ri, -1)}
                      disabled={ri === 0}
                      className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 disabled:opacity-30"
                      aria-label="Naik"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(ri, 1)}
                      disabled={ri === rows.length - 1}
                      className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 disabled:opacity-30"
                      aria-label="Turun"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeRow(ri)}
                      className="rounded-md p-1 text-rose-400 transition hover:bg-rose-50 hover:text-rose-600"
                      aria-label="Hapus"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={headers.length + 1} className="px-3 py-4 text-center text-xs text-slate-400">
                  Belum ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={addRow}
        className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:border-indigo-400 hover:text-indigo-600"
      >
        <Plus className="h-3.5 w-3.5" />
        Tambah Baris
      </button>
    </div>
  );
}

export { inputCls };
