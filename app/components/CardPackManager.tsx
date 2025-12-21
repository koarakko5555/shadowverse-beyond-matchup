"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type CardPack = {
  id: number;
  name: string;
  releaseDate: string;
};

type Props = {
  cardPacks: CardPack[];
};

export default function CardPackManager({ cardPacks }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (name.trim().length < 1 || name.trim().length > 100) {
      setError("カードパック名は1〜100文字で入力してください。");
      return;
    }

    if (!releaseDate) {
      setError("リリース日を入力してください。");
      return;
    }

    const res = await fetch("/api/card-packs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        releaseDate: new Date(releaseDate).toISOString(),
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "登録に失敗しました。");
      return;
    }

    setName("");
    setReleaseDate("");
    startTransition(() => router.refresh());
  };

  const onDelete = async (id: number) => {
    setError(null);
    const res = await fetch(`/api/card-packs/${id}`, {
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
    <div className="space-y-8">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
              Card Packs
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-zinc-900">
              カードパック管理
            </h1>
          </div>
          <div className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-500">
            最新のカードパックがデフォルト
          </div>
        </div>

        <form className="mt-6 grid gap-4 md:grid-cols-3" onSubmit={onSubmit}>
          <label className="flex flex-col gap-2 text-sm text-zinc-700">
            カードパック名
            <input
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="例: Dawn of Heroes"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-zinc-700">
            リリース日
            <input
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none"
              type="date"
              value={releaseDate}
              onChange={(event) => setReleaseDate(event.target.value)}
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
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900">
            登録済みカードパック
          </h2>
          <span className="text-sm text-zinc-500">
            {cardPacks.length}件
          </span>
        </div>
        <div className="mt-4 space-y-3">
          {cardPacks.length === 0 && (
            <p className="text-sm text-zinc-500">まだ登録がありません。</p>
          )}
          {cardPacks.map((pack, index) => (
            <div
              key={pack.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-zinc-900">
                    {pack.name}
                  </p>
                  {index === 0 && (
                    <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-xs text-white">
                      最新
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500">
                  {new Date(pack.releaseDate).toLocaleDateString("ja-JP")}
                </p>
              </div>
              <button
                className="text-sm font-semibold text-red-600 hover:text-red-700"
                onClick={() => onDelete(pack.id)}
                type="button"
              >
                削除
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
