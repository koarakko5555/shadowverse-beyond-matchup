"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

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

type Props = {
  cardPacks: CardPack[];
  decks: Deck[];
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

export default function DeckManager({ cardPacks, decks }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [deckClass, setDeckClass] = useState("");
  const [cardPackId, setCardPackId] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (name.trim().length < 1 || name.trim().length > 100) {
      setError("デッキ名は1〜100文字で入力してください。");
      return;
    }

    if (!deckClass) {
      setError("クラスを選択してください。");
      return;
    }

    const payload = {
      name: name.trim(),
      deckClass,
      cardPackId: cardPackId ? Number(cardPackId) : null,
    };

    const targetUrl = editingId ? `/api/decks/${editingId}` : "/api/decks";
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

    setName("");
    setDeckClass("");
    setCardPackId("");
    setEditingId(null);
    startTransition(() => router.refresh());
  };

  const onDelete = async (id: number) => {
    setError(null);
    const res = await fetch(`/api/decks/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "削除に失敗しました。");
      return;
    }

    startTransition(() => router.refresh());
  };

  const onEdit = (deck: Deck) => {
    setName(deck.name);
    setDeckClass(deck.deckClass);
    setCardPackId(String(deck.cardPack.id));
    setEditingId(deck.id);
  };

  const onCancelEdit = () => {
    setName("");
    setDeckClass("");
    setCardPackId("");
    setEditingId(null);
    setError(null);
  };

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
            Decks
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            {editingId ? "デッキ編集" : "デッキ登録"}
          </h2>
        </div>

        <form className="mt-6 grid gap-4 md:grid-cols-4" onSubmit={onSubmit}>
          <label className="flex flex-col gap-2 text-sm text-zinc-700 md:col-span-2">
            デッキ名
            <input
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="例: 回復ビショップ"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-zinc-700">
            クラス
            <select
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none"
              value={deckClass}
              onChange={(event) => setDeckClass(event.target.value)}
            >
              <option value="">選択してください</option>
              {Object.entries(deckClassLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm text-zinc-700">
            カードパック
            <select
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none"
              value={cardPackId}
              onChange={(event) => setCardPackId(event.target.value)}
            >
              <option value="">最新のカードパック</option>
              {cardPacks.map((pack) => (
                <option key={pack.id} value={pack.id}>
                  {pack.name}
                </option>
              ))}
            </select>
          </label>
          <div className="flex flex-col gap-3 md:col-span-4 md:flex-row md:items-end md:justify-between">
            <button
              className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400 md:w-auto md:min-w-[160px]"
              type="submit"
              disabled={isPending}
            >
              {editingId ? "更新する" : "追加する"}
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
          <h3 className="text-lg font-semibold text-zinc-900">
            登録済みデッキ
          </h3>
          <span className="text-sm text-zinc-500">{decks.length}件</span>
        </div>
        <div className="mt-4 space-y-3">
          {decks.length === 0 && (
            <p className="text-sm text-zinc-500">まだ登録がありません。</p>
          )}
          {decks.map((deck) => (
            <div
              key={deck.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-zinc-900">
                    {deck.name}
                  </p>
                  <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-xs text-white">
                    {deckClassLabels[deck.deckClass] ?? deck.deckClass}
                  </span>
                </div>
                <p className="text-xs text-zinc-500">
                  カードパック: {deck.cardPack.name}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  className="text-sm font-semibold text-zinc-700 hover:text-zinc-900"
                  onClick={() => onEdit(deck)}
                  type="button"
                >
                  編集
                </button>
                <button
                  className="text-sm font-semibold text-red-600 hover:text-red-700"
                  onClick={() => onDelete(deck.id)}
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
