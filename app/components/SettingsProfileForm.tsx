"use client";

import { useEffect, useState, useTransition } from "react";
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
  const [isDeleting, startTransitionDelete] = useTransition();

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [message]);

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

  const onDeleteAccount = async () => {
    setError(null);
    setMessage(null);
    if (!window.confirm("アカウントを削除します。よろしいですか？")) {
      return;
    }

    const res = await fetch("/api/settings/account", {
      method: "DELETE",
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "削除に失敗しました。");
      return;
    }

    setMessage("アカウントを削除しました。");
    startTransitionDelete(() => router.push("/signup"));
  };

  const content = (
    <>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
          Settings
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
          アカウント管理
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

      <div className="mt-8 border-t border-zinc-200 pt-6">
        <h3 className="text-sm font-semibold text-zinc-900">アカウント削除</h3>
        <p className="mt-2 text-xs text-zinc-700">
          登録した戦績・相性などのデータも削除されます。
        </p>
        <button
          className="mt-4 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={onDeleteAccount}
          disabled={isDeleting}
        >
          アカウントを削除する
        </button>
      </div>

      {message && (
        <div className="flash-in fixed left-1/2 top-4 z-50 w-[min(90vw,420px)] -translate-x-1/2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-center text-sm font-semibold text-emerald-700 shadow-sm">
          {message}
        </div>
      )}
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
