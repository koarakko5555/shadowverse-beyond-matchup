import { NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";

export const runtime = "nodejs";

const isValidWinRate = (value: number) =>
  Number.isInteger(value) && value >= 0 && value <= 100 && value % 5 === 0;

export async function GET() {
  const matchups = await prisma.matchup.findMany({
    orderBy: { id: "desc" },
    include: {
      deck1: { include: { cardPack: true } },
      deck2: { include: { cardPack: true } },
      user: true,
    },
  });

  return NextResponse.json(matchups);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const deck1Id =
    typeof body?.deck1Id === "number" ? body.deck1Id : undefined;
  const deck2Id =
    typeof body?.deck2Id === "number" ? body.deck2Id : undefined;
  const userId = typeof body?.userId === "number" ? body.userId : undefined;
  const winRate =
    typeof body?.winRate === "number" ? body.winRate : undefined;

  if (!deck1Id || !deck2Id) {
    return NextResponse.json(
      { error: "デッキを正しく選択してください。" },
      { status: 400 }
    );
  }

  if (!userId) {
    return NextResponse.json(
      { error: "ユーザーを選択してください。" },
      { status: 400 }
    );
  }

  if (deck1Id === deck2Id) {
    return NextResponse.json(
      { error: "同じデッキ同士は選択できません。" },
      { status: 400 }
    );
  }

  if (winRate === undefined || !isValidWinRate(winRate)) {
    return NextResponse.json(
      { error: "相性評価は0〜100の5刻みで入力してください。" },
      { status: 400 }
    );
  }

  const matchup = await prisma.matchup.upsert({
    where: {
      deck1Id_deck2Id_userId: {
        deck1Id,
        deck2Id,
        userId,
      },
    },
    update: {
      winRate,
    },
    create: {
      deck1Id,
      deck2Id,
      userId,
      winRate,
    },
    include: {
      deck1: { include: { cardPack: true } },
      deck2: { include: { cardPack: true } },
      user: true,
    },
  });

  return NextResponse.json(matchup, { status: 201 });
}
