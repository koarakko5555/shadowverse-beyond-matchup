"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

type CardPack = {
  id: number;
  name: string;
  releaseDate: string;
};

type Deck = {
  id: number;
  name: string;
  deckClass: string;
  cardPack: CardPack;
};

type Matchup = {
  id: number;
  deck1: Deck;
  deck2: Deck;
  user: User;
  winRate: number;
};

type Props = {
  decks: Deck[];
  users: User[];
  matchups: Matchup[];
};

type User = {
  id: number;
  name: string;
};

const deckClassLabels: Record<string, string> = {
  ELF: "エルフ",
  ROYAL: "ロイヤル",
  WITCH: "ウィッチ",
  NIGHTMARE: "ナイトメア",
  DRAGON: "ドラゴン",
  BISHOP: "ビショップ",
  NEMESIS: "ネメシス",
};

const winRateOptions = Array.from({ length: 21 }, (_, index) => index * 5);

export default function MatchupManager({ decks, users, matchups }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deck1Id, setDeck1Id] = useState("");
  const [deck2Id, setDeck2Id] = useState("");
  const [userId, setUserId] = useState("");
  const [winRate, setWinRate] = useState("50");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const deckOptions = useMemo(
    () =>
      decks.map((deck) => ({
        id: deck.id,
        label: `${deck.name} (${deckClassLabels[deck.deckClass] ?? deck.deckClass})`,
        cardPack: deck.cardPack.name,
      })),
    [decks]
  );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!deck1Id || !deck2Id) {
      setError("デッキを選択してください。");
      return;
    }

    if (!userId) {
      setError("ユーザーを選択してください。");
      return;
    }

    if (deck1Id === deck2Id) {
      setError("同じデッキ同士は選択できません。");
      return;
    }

    const payload = {
      deck1Id: Number(deck1Id),
      deck2Id: Number(deck2Id),
      userId: Number(userId),
      winRate: Number(winRate),
    };

    const targetUrl = editingId
      ? `/api/matchups/${editingId}`
      : "/api/matchups";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(targetUrl, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "登録に失敗しました。");
      return;
    }

    setDeck1Id("");
    setDeck2Id("");
    setUserId("");
    setWinRate("50");
    setEditingId(null);
    startTransition(() => router.refresh());
  };

  const onEdit = (matchup: Matchup) => {
    setDeck1Id(String(matchup.deck1.id));
    setDeck2Id(String(matchup.deck2.id));
    setUserId(String(matchup.user.id));
    setWinRate(String(matchup.winRate));
    setEditingId(matchup.id);
  };

  const onCancelEdit = () => {
    setDeck1Id("");
    setDeck2Id("");
    setUserId("");
    setWinRate("50");
    setEditingId(null);
    setError(null);
  };

  const onDelete = async (id: number) => {
    setError(null);
    const res = await fetch(`/api/matchups/${id}`, {
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
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
            Matchups
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            {editingId ? "相性評価の編集" : "相性評価の登録"}
          </h2>
        </div>

        <form className="mt-6 grid gap-4 md:grid-cols-4" onSubmit={onSubmit}>
          <label className="flex flex-col gap-2 text-sm text-zinc-700 md:col-span-2">
            デッキ1
            <select
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none"
              value={deck1Id}
              onChange={(event) => setDeck1Id(event.target.value)}
            >
              <option value="">選択してください</option>
              {deckOptions.map((deck) => (
                <option key={deck.id} value={deck.id}>
                  {deck.label} / {deck.cardPack}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm text-zinc-700 md:col-span-2">
            デッキ2
            <select
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none"
              value={deck2Id}
              onChange={(event) => setDeck2Id(event.target.value)}
            >
              <option value="">選択してください</option>
              {deckOptions.map((deck) => (
                <option key={deck.id} value={deck.id}>
                  {deck.label} / {deck.cardPack}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm text-zinc-700">
            相性評価
            <select
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none"
              value={winRate}
              onChange={(event) => setWinRate(event.target.value)}
            >
              {winRateOptions.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm text-zinc-700 md:col-span-2">
            ユーザー
            <select
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
            >
              <option value="">選択してください</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <div className="flex flex-col gap-3 md:col-span-3 md:flex-row md:items-end md:justify-start">
            <button
              className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400 md:w-auto md:min-w-[160px]"
              type="submit"
              disabled={isPending}
            >
              {editingId ? "更新する" : "登録する"}
            </button>
            {editingId && (
              <button
                className="w-full rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 md:w-auto md:min-w-[160px]"
                type="button"
                onClick={onCancelEdit}
              >
                編集をやめる
              </button>
            )}
          </div>
        </form>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-900">登録済み相性</h3>
          <span className="text-sm text-zinc-500">{matchups.length}件</span>
        </div>
        <div className="mt-4 space-y-3">
          {matchups.length === 0 && (
            <p className="text-sm text-zinc-500">まだ登録がありません。</p>
          )}
          {matchups.map((matchup) => (
            <div
              key={matchup.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  {matchup.deck1.name} vs {matchup.deck2.name}
                </p>
                <p className="text-xs text-zinc-500">
                  登録: {matchup.user.name} ・
                  {deckClassLabels[matchup.deck1.deckClass] ??
                    matchup.deck1.deckClass}{" "}
                  / {matchup.deck1.cardPack.name} →
                  {deckClassLabels[matchup.deck2.deckClass] ??
                    matchup.deck2.deckClass}{" "}
                  / {matchup.deck2.cardPack.name}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs text-white">
                  {matchup.winRate}
                </span>
                <button
                  className="text-sm font-semibold text-zinc-700 hover:text-zinc-900"
                  onClick={() => onEdit(matchup)}
                  type="button"
                >
                  編集
                </button>
                <button
                  className="text-sm font-semibold text-red-600 hover:text-red-700"
                  onClick={() => onDelete(matchup.id)}
                  type="button"
                >
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
