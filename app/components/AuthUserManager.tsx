"use client";

import { useState, useTransition } from "react";

type UserRow = {
  id: number;
  name: string;
  role: "ADMIN" | "MEMBER";
  createdAt: string;
};

type Props = {
  users: UserRow[];
  isAdmin: boolean;
  currentUserId?: number;
  embedded?: boolean;
};

export default function AuthUserManager({
  users,
  isAdmin,
  currentUserId,
  embedded,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<UserRow[]>(users);

  const updateRole = async (userId: number, role: "ADMIN" | "MEMBER") => {
    setError(null);
    const res = await fetch("/api/admin/users/role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, role }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "更新に失敗しました。");
      return;
    }

    startTransition(() => {
      setRows((prev) =>
        prev.map((row) => (row.id === userId ? { ...row, role } : row))
      );
    });
  };

  const content = (
    <>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
          Users
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
          認証ユーザー管理
        </h2>
      </div>

      {!isAdmin && (
        <p className="mt-4 text-sm text-red-600">
          管理者のみ閲覧できます。
        </p>
      )}
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {isAdmin && (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm text-zinc-700">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="px-3 py-2">表示名</th>
                <th className="px-3 py-2">ロール</th>
                <th className="px-3 py-2">登録日</th>
                <th className="px-3 py-2 text-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((user) => (
                <tr key={user.id} className="border-b border-zinc-200">
                  <td className="px-3 py-3 font-semibold text-zinc-900">
                    {user.name}
                  </td>
                  <td className="px-3 py-3">
                    <select
                      className="rounded-lg border border-zinc-200 px-2 py-1 text-sm text-zinc-900"
                      value={user.role}
                      onChange={(event) =>
                        updateRole(
                          user.id,
                          event.target.value === "ADMIN" ? "ADMIN" : "MEMBER"
                        )
                      }
                      disabled={
                        !isAdmin ||
                        isPending ||
                        currentUserId === user.id
                      }
                    >
                      <option value="ADMIN">admin</option>
                      <option value="MEMBER">member</option>
                    </select>
                  </td>
                  <td className="px-3 py-3 text-xs text-zinc-700">
                    {new Date(user.createdAt).toLocaleDateString("ja-JP")}
                  </td>
                  <td className="px-3 py-3 text-center text-xs text-zinc-700">
                    {currentUserId === user.id ? "現在のユーザー" : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );

  if (embedded) {
    return <div className="space-y-6">{content}</div>;
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      {content}
    </section>
  );
}
