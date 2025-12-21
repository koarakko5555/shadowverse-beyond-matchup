import CardPackManager from "@/app/components/CardPackManager";
import DeckManager from "@/app/components/DeckManager";
import MatchupManager from "@/app/components/MatchupManager";
import StatsTable from "@/app/components/StatsTable";
import UserManager from "@/app/components/UserManager";
import { prisma } from "@/app/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function Home() {
  const cardPacks = await prisma.cardPack.findMany({
    orderBy: { releaseDate: "desc" },
  });
  const decks = await prisma.deck.findMany({
    orderBy: { id: "desc" },
    include: { cardPack: true },
  });
  const users = await prisma.user.findMany({
    orderBy: { id: "asc" },
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
    <div className="min-h-screen bg-zinc-100 px-6 py-12 text-zinc-900">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <CardPackManager
          cardPacks={cardPacks.map((pack) => ({
            ...pack,
            releaseDate: pack.releaseDate.toISOString(),
          }))}
        />
        <DeckManager
          cardPacks={cardPacks.map((pack) => ({
            ...pack,
            releaseDate: pack.releaseDate.toISOString(),
          }))}
          decks={decks.map((deck) => ({
            ...deck,
            cardPack: {
              ...deck.cardPack,
              releaseDate: deck.cardPack.releaseDate.toISOString(),
            },
          }))}
        />
        <MatchupManager
          decks={decks.map((deck) => ({
            ...deck,
            cardPack: {
              ...deck.cardPack,
              releaseDate: deck.cardPack.releaseDate.toISOString(),
            },
          }))}
          users={users}
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
        <UserManager users={users} />
        <StatsTable decks={decks} matchups={matchups} />
      </main>
    </div>
  );
}
