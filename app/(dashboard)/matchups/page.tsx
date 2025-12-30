import MatchupManager from "@/app/components/MatchupManager";
import { prisma } from "@/app/lib/prisma";

export const runtime = "nodejs";

export default async function MatchupsPage() {
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

  return (
    <MatchupManager
      decks={decks.map((deck) => ({
        ...deck,
        cardPack: {
          ...deck.cardPack,
          releaseDate: deck.cardPack.releaseDate.toISOString(),
        },
      }))}
      matchups={matchups.map((matchup) => ({
        ...matchup,
        deck1: {
          ...matchup.deck1,
          cardPack: {
            ...matchup.deck1.cardPack,
            releaseDate: matchup.deck1.cardPack.releaseDate.toISOString(),
          },
        },
        deck2: {
          ...matchup.deck2,
          cardPack: {
            ...matchup.deck2.cardPack,
            releaseDate: matchup.deck2.cardPack.releaseDate.toISOString(),
          },
        },
      }))}
    />
  );
}
