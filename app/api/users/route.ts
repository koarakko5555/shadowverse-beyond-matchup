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
  return NextResponse.json(
    { error: "このエンドポイントは使用していません。" },
    { status: 405 }
  );
}
