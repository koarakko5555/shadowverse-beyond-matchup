import AuthUserManager from "@/app/components/AuthUserManager";
import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";

export const runtime = "nodejs";

export default async function UsersPage() {
  const session = await getSession();
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
  });
  const current = session
    ? await prisma.user.findUnique({
        where: { id: Number(session.sub) },
        select: { role: true },
      })
    : null;

  return (
    <AuthUserManager
      users={users.map((row) => ({
        id: row.id,
        name: row.name,
        role: row.role,
        createdAt: row.createdAt.toISOString(),
      }))}
      isAdmin={current?.role === "ADMIN"}
      currentUserId={session ? Number(session.sub) : undefined}
    />
  );
}
