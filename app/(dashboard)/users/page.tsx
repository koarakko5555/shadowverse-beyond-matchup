import AuthUserManager from "@/app/components/AuthUserManager";
import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";

export const runtime = "nodejs";

export default async function UsersPage() {
  const session = await getSession();
  const currentUserId = session ? Number(session.sub) : null;
  const current = currentUserId
    ? await prisma.user.findUnique({
        where: { id: currentUserId },
        select: { role: true },
      })
    : null;

  if (current?.role !== "ADMIN") {
    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
            Users
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            認証ユーザー管理
          </h2>
        </div>
        <p className="mt-4 text-sm text-red-600">
          管理者のみ閲覧できます。
        </p>
      </section>
    );
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <AuthUserManager
      users={users.map((row) => ({
        id: row.id,
        name: row.name,
        role: row.role,
        createdAt: row.createdAt.toISOString(),
      }))}
      isAdmin={true}
      currentUserId={currentUserId ?? undefined}
    />
  );
}
