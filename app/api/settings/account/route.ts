import { NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";
import { clearSessionCookie, getSession } from "@/app/lib/session";

export const runtime = "nodejs";

export async function DELETE() {
  const session = await getSession();
  const userId = Number(session?.sub);

  if (!Number.isInteger(userId)) {
    return NextResponse.json({ error: "認証が必要です。" }, { status: 401 });
  }

  await prisma.$transaction([
    prisma.matchRecord.deleteMany({ where: { userId } }),
    prisma.matchup.deleteMany({ where: { userId } }),
    prisma.user.delete({ where: { id: userId } }),
  ]);

  await clearSessionCookie();

  return NextResponse.json({ ok: true });
}
