import StatsTable from "@/app/components/StatsTable";
import { prisma } from "@/app/lib/prisma";

export const runtime = "nodejs";

export default async function StatsPage() {
  const decks = await prisma.deck.findMany({
    orderBy: { id: "desc" },
    include: { cardPack: true },
  });
  const matchups = await prisma.matchup.findMany({
    orderBy: { id: "desc" },
    include: {
      deck1: { include: { cardPack: true } },
      deck2: { include: { cardPack: true } },
      user: true,
    },
  });

  return <StatsTable decks={decks} matchups={matchups} />;
}
