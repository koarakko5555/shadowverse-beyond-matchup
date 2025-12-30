import { NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const current = await prisma.user.findUnique({
    where: { id: Number(session.sub) },
    select: { role: true },
  });

  if (current?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const targetId = typeof body?.id === "number" ? body.id : null;
  const role = body?.role === "ADMIN" ? "ADMIN" : "MEMBER";

  if (!targetId) {
    return NextResponse.json({ error: "IDが不正です。" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: targetId },
    data: { role },
  });

  return NextResponse.json({ ok: true });
}
