import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/app/lib/prisma";
import { isValidLoginId } from "@/app/lib/auth";
import { createSessionToken, setSessionCookie } from "@/app/lib/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const loginId = typeof body?.loginId === "string" ? body.loginId.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!loginId || !password) {
    return NextResponse.json(
      { error: "IDとパスワードを入力してください。" },
      { status: 400 }
    );
  }
  if (!isValidLoginId(loginId)) {
    return NextResponse.json({ error: "IDかパスワードが違います。" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { loginId },
  });

  if (!user) {
    return NextResponse.json({ error: "IDかパスワードが違います。" }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return NextResponse.json({ error: "IDかパスワードが違います。" }, { status: 401 });
  }

  const token = await createSessionToken({
    sub: String(user.id),
    role: user.role,
  });
  await setSessionCookie(token);

  return NextResponse.json({ ok: true });
}
