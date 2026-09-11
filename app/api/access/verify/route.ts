import { NextResponse } from "next/server";

const ACCESS_COOKIE_NAME = "ai_mirror_access";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code : "";

  const expected = process.env.AI_MIRROR_ACCESS_CODE;
  if (!expected) {
    console.error("AI_MIRROR_ACCESS_CODE is not configured.");
    return NextResponse.json({ error: "Access is not configured." }, { status: 500 });
  }

  if (code !== expected) {
    return NextResponse.json({ error: "Invalid access code." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ACCESS_COOKIE_NAME, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // No maxAge: a session cookie, cleared when the browser fully closes.
  });
  return response;
}
