"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string }> {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD ?? "";

  if (expected && password === expected) {
    cookies().set("admin_auth", expected, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    redirect("/admin");
  }

  return { error: "Incorrect password." };
}

export async function logout() {
  cookies().delete("admin_auth");
  redirect("/admin");
}
