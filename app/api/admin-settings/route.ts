import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

const KEY = "mijafa_settings_v1";

const DEFAULT = {
  preReading: ["Asmaul Husna", "Doa-doa dalam Sholat"],
  surahCurrent: 0,
  surahCompleted: [],
};

function kvAvailable() {
  return !!(process.env.KV_URL || process.env.KV_REST_API_URL);
}

export async function GET() {
  if (!kvAvailable()) {
    return NextResponse.json(DEFAULT);
  }
  try {
    const data = await kv.get(KEY);
    return NextResponse.json(data ?? DEFAULT);
  } catch {
    return NextResponse.json(DEFAULT);
  }
}

export async function POST(request: Request) {
  if (!kvAvailable()) {
    return NextResponse.json({ ok: false, reason: "KV not configured" }, { status: 503 });
  }
  try {
    const body = await request.json();
    const payload = {
      preReading: Array.isArray(body.preReading)
        ? body.preReading
        : DEFAULT.preReading,
      surahCurrent:
        typeof body.surahCurrent === "number"
          ? body.surahCurrent
          : DEFAULT.surahCurrent,
      surahCompleted: Array.isArray(body.surahCompleted)
        ? body.surahCompleted
        : DEFAULT.surahCompleted,
    };
    await kv.set(KEY, payload);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
