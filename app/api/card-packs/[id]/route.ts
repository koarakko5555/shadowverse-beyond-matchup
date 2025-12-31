import { NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";

export const runtime = "nodejs";

type Params = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_: Request, { params }: Params) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "IDが不正です。" }, { status: 400 });
  }

  const deckIds = await prisma.deck.findMany({
    where: { cardPackId: id },
    select: { id: true },
  });
  const ids = deckIds.map((deck) => deck.id);

  await prisma.$transaction([
    prisma.matchRecord.deleteMany({
      where: {
        OR: [{ deckId: { in: ids } }, { opponentDeckId: { in: ids } }],
      },
    }),
    prisma.matchup.deleteMany({
      where: {
        OR: [{ deck1Id: { in: ids } }, { deck2Id: { in: ids } }],
      },
    }),
    prisma.deck.deleteMany({ where: { cardPackId: id } }),
    prisma.cardPack.delete({ where: { id } }),
  ]);

  return NextResponse.json({ ok: true });
}
