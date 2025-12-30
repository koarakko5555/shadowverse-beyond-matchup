import CardPackManager from "@/app/components/CardPackManager";
import { prisma } from "@/app/lib/prisma";

export const runtime = "nodejs";

export default async function PacksPage() {
  const cardPacks = await prisma.cardPack.findMany({
    orderBy: { releaseDate: "desc" },
  });

  return (
    <CardPackManager
      cardPacks={cardPacks.map((pack) => ({
        ...pack,
        releaseDate: pack.releaseDate.toISOString(),
      }))}
    />
  );
}
