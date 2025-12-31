import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/app/lib/prisma";
import { isValidLoginId } from "@/app/lib/auth";
import { createSessionToken, setSessionCookie } from "@/app/lib/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const loginId = typeof body?.loginId === "string" ? body.loginId.trim() : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!loginId || !name || !password) {
    return NextResponse.json(
      { error: "ID・表示名・パスワードを入力してください。" },
      { status: 400 }
    );
  }
  if (!isValidLoginId(loginId)) {
    return NextResponse.json(
      { error: "IDは英数字と記号(_ . -)のみ、3〜30文字で入力してください。" },
      { status: 400 }
    );
  }

  if (password.length < 1) {
    return NextResponse.json(
      { error: "パスワードを入力してください。" },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({
    where: { loginId },
  });
  if (existing) {
    return NextResponse.json({ error: "このIDは使用されています。" }, { status: 409 });
  }

  const userCount = await prisma.user.count();
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      loginId,
      name,
      passwordHash,
      role: userCount === 0 ? "ADMIN" : "MEMBER",
    },
  });

  const token = await createSessionToken({
    sub: String(user.id),
    role: user.role,
  });
  await setSessionCookie(token);

  return NextResponse.json({ ok: true });
}
