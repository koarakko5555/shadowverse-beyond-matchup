import SettingsHub from "@/app/components/SettingsHub";
import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";

export const runtime = "nodejs";

export default async function SettingsPage() {
  const session = await getSession();
  const userId = Number(session?.sub);

  if (!Number.isInteger(userId)) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, role: true },
  });

  const [cardPacks, decks, users] = await Promise.all([
    prisma.cardPack.findMany({ orderBy: { releaseDate: "desc" } }),
    prisma.deck.findMany({
      orderBy: { id: "desc" },
      include: { cardPack: true },
    }),
    user?.role === "ADMIN"
      ? prisma.user.findMany({ orderBy: { createdAt: "asc" } })
      : Promise.resolve([]),
  ]);

  return (
    <SettingsHub
      profileName={user?.name ?? ""}
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
      users={users.map((row) => ({
        id: row.id,
        name: row.name,
        role: row.role,
        createdAt: row.createdAt.toISOString(),
      }))}
      isAdmin={user?.role === "ADMIN"}
      currentUserId={userId}
    />
  );
}
