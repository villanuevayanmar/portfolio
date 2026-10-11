import { NextRequest, NextResponse } from "next/server";
import { getAnonClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = (await req.json()) as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Please fill in your name, email and message." },
        { status: 400 }
      );
    }

    const { error } = await getAnonClient().from("contact_messages").insert({
      name: String(name),
      email: String(email),
      subject: subject ? String(subject) : null,
      message: String(message),
    });

    if (error) {
      console.error("contact insert error:", error.message);
      return NextResponse.json(
        { ok: false, error: "Could not save your message. Please try again." },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact handler error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
