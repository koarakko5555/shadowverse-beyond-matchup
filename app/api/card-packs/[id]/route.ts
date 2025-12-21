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

  await prisma.cardPack.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}
