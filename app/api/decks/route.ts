import { NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";

export const runtime = "nodejs";

const deckClasses = [
  "ELF",
  "ROYAL",
  "WITCH",
  "NIGHTMARE",
  "DRAGON",
  "BISHOP",
  "NEMESIS",
] as const;

type DeckClass = (typeof deckClasses)[number];

export async function GET() {
  const decks = await prisma.deck.findMany({
    orderBy: { id: "desc" },
    include: { cardPack: true },
  });

  return NextResponse.json(decks);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const deckClass = body?.deckClass as DeckClass | undefined;
  const cardPackId =
    typeof body?.cardPackId === "number" ? body.cardPackId : null;

  if (name.length < 1 || name.length > 10) {
    return NextResponse.json(
      { error: "デッキ名は1〜10文字で入力してください。" },
      { status: 400 }
    );
  }

  if (!deckClass || !deckClasses.includes(deckClass)) {
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

  const deck = await prisma.deck.create({
    data: {
      name,
      deckClass,
      cardPackId: resolvedCardPackId,
    },
    include: { cardPack: true },
  });

  return NextResponse.json(deck, { status: 201 });
}
