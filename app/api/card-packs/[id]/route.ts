import { NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";

export const runtime = "nodejs";

type Params = {
  params: { id: string };
};

export async function DELETE(_: Request, { params }: Params) {
  const id = Number(params.id);

  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "IDが不正です。" }, { status: 400 });
  }

  await prisma.cardPack.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}
