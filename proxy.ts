import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ACCESS_COOKIE_NAME = "ai_mirror_access";

export function proxy(request: NextRequest) {
  const expected = process.env.AI_MIRROR_ACCESS_CODE;

  // No code configured — don't lock visitors out of a misconfigured deploy.
  if (!expected) {
    return NextResponse.next();
  }

  const cookieValue = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  if (cookieValue === expected) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accessUrl = new URL("/access", request.url);
  accessUrl.searchParams.set("redirect", request.nextUrl.pathname);
  return NextResponse.redirect(accessUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|access|api/access/verify|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
