import { NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";

export const runtime = "nodejs";

type Params = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_: Request, { params }: Params) {
  const session = await getSession();
  if (session?.role !== "ADMIN") {
    return NextResponse.json(
      { error: "管理者のみ削除できます。" },
      { status: 403 }
    );
  }
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "IDが不正です。" }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.matchup.deleteMany({
      where: {
        OR: [{ deck1Id: id }, { deck2Id: id }],
      },
    }),
    prisma.deck.delete({ where: { id } }),
  ]);

  return NextResponse.json({ ok: true });
}

export async function PUT(request: Request, { params }: Params) {
  const session = await getSession();
  if (session?.role !== "ADMIN") {
    return NextResponse.json(
      { error: "管理者のみ編集できます。" },
      { status: 403 }
    );
  }

  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "IDが不正です。" }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const deckClass = typeof body?.deckClass === "string" ? body.deckClass : "";
  const cardPackId =
    typeof body?.cardPackId === "number" ? body.cardPackId : null;

  if (name.length < 1 || name.length > 10) {
    return NextResponse.json(
      { error: "デッキ名は1〜10文字で入力してください。" },
      { status: 400 }
    );
  }

  if (!deckClass) {
    return NextResponse.json(
      { error: "クラスを正しく選択してください。" },
      { status: 400 }
    );
  }

  let resolvedCardPackId = cardPackId;
  if (!resolvedCardPackId) {
    const latestPack = await prisma.cardPack.findFirst({
      orderBy: { releaseDate: "desc" },
    });
    if (!latestPack) {
      return NextResponse.json(
        { error: "カードパックが登録されていません。" },
        { status: 400 }
      );
    }
    resolvedCardPackId = latestPack.id;
  }

  const deck = await prisma.deck.update({
    where: { id },
    data: {
      name,
      deckClass,
      cardPackId: resolvedCardPackId,
    },
    include: { cardPack: true },
  });

  return NextResponse.json(deck);
}
