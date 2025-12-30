import DeckManager from "@/app/components/DeckManager";
import { prisma } from "@/app/lib/prisma";

export const runtime = "nodejs";

export default async function DecksPage() {
  const cardPacks = await prisma.cardPack.findMany({
    orderBy: { releaseDate: "desc" },
  });
  const decks = await prisma.deck.findMany({
    orderBy: { id: "desc" },
    include: { cardPack: true },
  });

  return (
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
  );
}
