import { NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { id: "asc" },
  });

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";

  if (name.length < 1 || name.length > 100) {
    return NextResponse.json(
      { error: "ユーザー名は1〜100文字で入力してください。" },
      { status: 400 }
    );
  }

  const user = await prisma.user.create({
    data: { name },
  });

  return NextResponse.json(user, { status: 201 });
}
