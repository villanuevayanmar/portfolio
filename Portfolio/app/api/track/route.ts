import { NextRequest, NextResponse } from "next/server";
import { getAnonClient } from "@/lib/supabase/server";

// Records an anonymous page view. Geo/region is read from Vercel request
// headers, which are injected automatically in production on Vercel.
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      path?: string;
      referrer?: string;
    };

    const { error } = await getAnonClient().from("page_views").insert({
      path: body.path ?? req.nextUrl.pathname,
      user_agent: req.headers.get("user-agent") ?? "",
      country: req.headers.get("x-vercel-ip-country"),
      region: req.headers.get("x-vercel-ip-country-region"),
      city: req.headers.get("x-vercel-ip-city"),
      referrer: body.referrer ?? req.headers.get("referer") ?? null,
    });

    if (error) {
      console.error("track insert error:", error.message);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("track handler error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
