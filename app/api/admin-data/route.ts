import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import { DEFAULT_ADMIN_DATA } from "@/lib/adminData";

const KEY = "mijafa_admin_data_v1";

function kvAvailable() {
  return !!(process.env.KV_URL || process.env.KV_REST_API_URL);
}

export async function GET() {
  if (!kvAvailable()) {
    return NextResponse.json(DEFAULT_ADMIN_DATA);
  }
  try {
    const data = await kv.get(KEY);
    return NextResponse.json(data ?? DEFAULT_ADMIN_DATA);
  } catch {
    return NextResponse.json(DEFAULT_ADMIN_DATA);
  }
}

export async function POST(request: Request) {
  if (!kvAvailable()) {
    return NextResponse.json({ ok: false, reason: "KV not configured" }, { status: 503 });
  }
  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, reason: "invalid body" }, { status: 400 });
    }
    await kv.set(KEY, body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
