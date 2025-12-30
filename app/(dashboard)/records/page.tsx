import MatchRecordManager from "@/app/components/MatchRecordManager";
import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";

export const runtime = "nodejs";

export default async function RecordsPage() {
  const session = await getSession();
  const userId = Number(session?.sub);

  const decks = await prisma.deck.findMany({
    orderBy: { id: "desc" },
    include: { cardPack: true },
  });
  const records = await prisma.matchRecord.findMany({
    where: Number.isInteger(userId) ? { userId } : undefined,
    orderBy: { id: "desc" },
    include: {
      deck: { include: { cardPack: true } },
      opponentDeck: { include: { cardPack: true } },
      user: true,
    },
  });

  return (
    <MatchRecordManager
      decks={decks.map((deck) => ({
        ...deck,
        cardPack: {
          ...deck.cardPack,
          releaseDate: deck.cardPack.releaseDate.toISOString(),
        },
      }))}
      records={records.map((record) => ({
        ...record,
        createdAt: record.createdAt.toISOString(),
        deck: {
          ...record.deck,
          cardPack: {
            ...record.deck.cardPack,
            releaseDate: record.deck.cardPack.releaseDate.toISOString(),
          },
        },
        opponentDeck: {
          ...record.opponentDeck,
          cardPack: {
            ...record.opponentDeck.cardPack,
            releaseDate: record.opponentDeck.cardPack.releaseDate.toISOString(),
          },
        },
      }))}
    />
  );
}
