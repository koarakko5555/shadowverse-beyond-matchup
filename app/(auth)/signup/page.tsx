"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { isValidLoginId } from "@/app/lib/auth";
export default function SignupPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loginId, setLoginId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!loginId.trim() || !name.trim() || !password) {
      setError("ID・表示名・パスワードを入力してください。");
      return;
    }
    if (!isValidLoginId(loginId.trim())) {
      setError("IDは英数字と記号(_ . -)のみ、3〜30文字で入力してください。");
      return;
    }
    if (password.length < 1) {
      setError("パスワードを入力してください。");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        loginId: loginId.trim(),
        name: name.trim(),
        password,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "登録に失敗しました。");
      return;
    }

    startTransition(() => router.push("/records"));
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
          Signup
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">
          新規登録
        </h1>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <label className="flex flex-col gap-2 text-sm text-zinc-700">
          ID
          <input
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none"
            value={loginId}
            onChange={(event) => setLoginId(event.target.value)}
            placeholder="例: torieru"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-zinc-700">
          表示名
          <input
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="例: とりえる"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-zinc-700">
          パスワード
          <input
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
          type="submit"
          disabled={isPending}
        >
          登録する
        </button>
      </form>

      <div className="text-sm text-zinc-700">
        既にアカウントがある場合は{" "}
        <Link className="font-semibold text-zinc-900" href="/login">
          ログイン
        </Link>
      </div>
    </div>
  );
}
