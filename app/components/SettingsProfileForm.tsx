"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Props = {
  initialName: string;
  embedded?: boolean;
};

export default function SettingsProfileForm({ initialName, embedded }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    const trimmed = name.trim();
    if (!trimmed || trimmed.length > 50) {
      setError("表示名は1〜50文字で入力してください。");
      return;
    }

    const res = await fetch("/api/settings/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: trimmed }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "更新に失敗しました。");
      return;
    }

    setMessage("表示名を更新しました。");
    startTransition(() => router.refresh());
  };

  const content = (
    <>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
          Settings
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
          表示名の変更
        </h2>
      </div>

      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <label className="flex flex-col gap-2 text-sm text-zinc-700">
          表示名
          <input
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="表示名を入力"
          />
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400 sm:w-auto sm:min-w-[160px]"
            type="submit"
            disabled={isPending}
          >
            変更する
          </button>
          {message && <span className="text-sm text-emerald-600">{message}</span>}
        </div>
      </form>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
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
