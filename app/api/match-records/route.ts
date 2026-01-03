import { NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";

export const runtime = "nodejs";

const isValidTurn = (value: string): value is "FIRST" | "SECOND" =>
  value === "FIRST" || value === "SECOND";

const isValidResult = (value: string): value is "WIN" | "LOSS" =>
  value === "WIN" || value === "LOSS";

const fetchDecks = async (
  userId: number,
  deckId: number,
  opponentDeckId: number
) => {
  const decks = await prisma.recordDeck.findMany({
    where: { userId, id: { in: [deckId, opponentDeckId] } },
    select: { id: true, cardPackId: true },
  });
  if (decks.length < 1) return null;
  const byId = new Map(decks.map((deck) => [deck.id, deck]));
  const deck = byId.get(deckId);
  const opponent = byId.get(opponentDeckId) ?? deck;
  return { deck, opponent };
};

export async function GET() {
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

  const records = await prisma.matchRecord.findMany({
    where: { userId },
    orderBy: { id: "desc" },
    include: {
      deck: { include: { cardPack: true } },
      opponentDeck: { include: { cardPack: true } },
      user: true,
    },
  });

  return NextResponse.json(records);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const deckId = typeof body?.deckId === "number" ? body.deckId : undefined;
  const opponentDeckId =
    typeof body?.opponentDeckId === "number" ? body.opponentDeckId : undefined;
  const turn = typeof body?.turn === "string" ? body.turn : "";
  const result = typeof body?.result === "string" ? body.result : "";
  const note = typeof body?.note === "string" ? body.note : "";

  if (!deckId || !opponentDeckId) {
    return NextResponse.json(
      { error: "デッキを正しく選択してください。" },
      { status: 400 }
    );
  }

  if (!isValidTurn(turn) || !isValidResult(result)) {
    return NextResponse.json(
      { error: "先攻/後攻・勝敗を正しく選択してください。" },
      { status: 400 }
    );
  }

  const decks = await fetchDecks(userId, deckId, opponentDeckId);
  if (!decks?.deck || !decks?.opponent) {
    return NextResponse.json(
      { error: "デッキ情報を確認できませんでした。" },
      { status: 400 }
    );
  }

  if (decks.deck.cardPackId !== decks.opponent.cardPackId) {
    return NextResponse.json(
      { error: "同じカードパックのデッキ同士で登録してください。" },
      { status: 400 }
    );
  }

  const userId = Number(session.sub);
  if (!Number.isInteger(userId)) {
    return NextResponse.json(
      { error: "ユーザー情報を確認できませんでした。" },
      { status: 401 }
    );
  }

  const record = await prisma.matchRecord.create({
    data: {
      deckId,
      opponentDeckId,
      userId,
      turn,
      result,
      note,
    },
    include: {
      deck: { include: { cardPack: true } },
      opponentDeck: { include: { cardPack: true } },
      user: true,
    },
  });

  return NextResponse.json(record, { status: 201 });
}
