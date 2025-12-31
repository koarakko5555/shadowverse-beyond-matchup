import MatchupManager from "@/app/components/MatchupManager";
import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";

export const runtime = "nodejs";

export default async function MatchupsPage() {
  const session = await getSession();
  const userId = session ? Number(session.sub) : null;

  const decks = await prisma.deck.findMany({
    orderBy: { id: "desc" },
    include: { cardPack: true },
  });
  const cardPacks = await prisma.cardPack.findMany({
    orderBy: { releaseDate: "desc" },
  });
  const matchups = await prisma.matchup.findMany({
    where: Number.isInteger(userId) ? { userId: userId as number } : undefined,
    orderBy: { id: "desc" },
    include: {
      deck1: { include: { cardPack: true } },
      deck2: { include: { cardPack: true } },
      user: true,
    },
  });
  const statsMatchups = await prisma.matchup.findMany({
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
      cardPacks={cardPacks.map((pack) => ({
        ...pack,
        releaseDate: pack.releaseDate.toISOString(),
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
      statsMatchups={statsMatchups.map((matchup) => ({
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
