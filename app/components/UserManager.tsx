"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type User = {
  id: number;
  name: string;
};

type Props = {
  users: User[];
};

export default function UserManager({ users }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (name.trim().length < 1 || name.trim().length > 100) {
      setError("ユーザー名は1〜100文字で入力してください。");
      return;
    }

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim() }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "登録に失敗しました。");
      return;
    }

    setName("");
    startTransition(() => router.refresh());
  };

  const onDelete = async (id: number) => {
    setError(null);
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "削除に失敗しました。");
      return;
    }

    startTransition(() => router.refresh());
  };

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
          Users
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
          ユーザー管理
        </h2>
      </div>

      <form className="mt-6 grid gap-4 md:grid-cols-3" onSubmit={onSubmit}>
        <label className="flex flex-col gap-2 text-sm text-zinc-700 md:col-span-2">
          ユーザー名
          <input
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="例: hosaka"
          />
        </label>
        <div className="flex items-end">
          <button
            className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
            type="submit"
            disabled={isPending}
          >
            追加する
          </button>
        </div>
      </form>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-900">登録済みユーザー</h3>
          <span className="text-sm text-zinc-700">{users.length}件</span>
        </div>
        {users.length === 0 && (
          <p className="text-sm text-zinc-700">まだ登録がありません。</p>
        )}
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3"
          >
            <p className="text-sm font-semibold text-zinc-900">{user.name}</p>
            <button
              className="text-sm font-semibold text-red-600 hover:text-red-700"
              onClick={() => onDelete(user.id)}
              type="button"
            >
              削除
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
