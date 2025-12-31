import { NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";

export const runtime = "nodejs";

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = Number(session.sub);
  if (!Number.isInteger(userId)) {
    return NextResponse.json(
      { error: "ユーザー情報を確認できませんでした。" },
      { status: 401 }
    );
  }

  const body = await request.json().catch(() => null);
  const isPublic =
    typeof body?.isPublic === "boolean" ? body.isPublic : null;

  if (isPublic === null) {
    return NextResponse.json(
      { error: "公開設定が不正です。" },
      { status: 400 }
    );
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { isPublic },
    select: { id: true, isPublic: true },
  });

  return NextResponse.json(user);
}
