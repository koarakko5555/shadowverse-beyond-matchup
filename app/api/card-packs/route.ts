import { NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const cardPacks = await prisma.cardPack.findMany({
    orderBy: { releaseDate: "desc" },
  });

  return NextResponse.json(cardPacks);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const releaseDate = body?.releaseDate ? new Date(body.releaseDate) : null;

  if (name.length < 1 || name.length > 100) {
    return NextResponse.json(
      { error: "カードパック名は1〜100文字で入力してください。" },
      { status: 400 }
    );
  }

  if (!releaseDate || Number.isNaN(releaseDate.getTime())) {
    return NextResponse.json(
      { error: "リリース日を正しく入力してください。" },
      { status: 400 }
    );
  }

  const cardPack = await prisma.cardPack.create({
    data: {
      name,
      releaseDate,
    },
  });

  return NextResponse.json(cardPack, { status: 201 });
}
