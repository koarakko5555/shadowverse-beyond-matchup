"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

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

type User = {
  id: number;
  name: string;
};

type MatchRecord = {
  id: number;
  deck: Deck;
  opponentDeck: Deck;
  user: User;
  turn: "FIRST" | "SECOND";
  result: "WIN" | "LOSS";
  note: string;
  createdAt: string;
};

type Props = {
  decks: Deck[];
  cardPacks: CardPack[];
  records: MatchRecord[];
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

const turnLabels: Record<MatchRecord["turn"], string> = {
  FIRST: "先攻",
  SECOND: "後攻",
};

const resultLabels: Record<MatchRecord["result"], string> = {
  WIN: "勝ち",
  LOSS: "負け",
};

const formatRate = (value: number | null) =>
  value === null ? "-" : Number.isInteger(value) ? `${value}` : value.toFixed(1);

export default function MatchRecordManager({ decks, cardPacks, records }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deckId, setDeckId] = useState("");
  const [opponentDeckId, setOpponentDeckId] = useState("");
  const [turn, setTurn] = useState<MatchRecord["turn"]>("FIRST");
  const [result, setResult] = useState<MatchRecord["result"]>("WIN");
  const [note, setNote] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const [activePackId, setActivePackId] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const pageSize = 10;

  useEffect(() => {
    if (!flashMessage) return;
    const timer = setTimeout(() => setFlashMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [flashMessage]);

  useEffect(() => {
    if (activePackId !== null || cardPacks.length === 0) return;
    setActivePackId(cardPacks[0].id);
  }, [activePackId, cardPacks]);

  const filteredDecks = useMemo(() => {
    if (!activePackId) return [];
    return decks.filter((deck) => deck.cardPack.id === activePackId);
  }, [activePackId, decks]);

  const filteredRecords = useMemo(() => {
    if (!activePackId) return [];
    return records.filter((record) => record.deck.cardPack.id === activePackId);
  }, [activePackId, records]);

  useEffect(() => {
    setPage(1);
  }, [activePackId]);

  const lastUsedDeckId = useMemo(() => {
    for (const record of filteredRecords) {
      if (record.deck?.id) return record.deck.id;
    }
    return null;
  }, [filteredRecords]);

  useEffect(() => {
    if (deckId || !lastUsedDeckId) return;
    setDeckId(String(lastUsedDeckId));
  }, [deckId, lastUsedDeckId]);

  const selectedDeck = useMemo(
    () => filteredDecks.find((deck) => deck.id === Number(deckId)),
    [deckId, filteredDecks]
  );

  const opponentOptions = useMemo(() => {
    if (!selectedDeck) return filteredDecks;
    return filteredDecks.filter(
      (deck) => deck.cardPack.id === selectedDeck.cardPack.id
    );
  }, [filteredDecks, selectedDeck]);

  const deckOptions = useMemo(
    () =>
      filteredDecks.map((deck) => ({
        id: deck.id,
        label: `${deck.name} (${deckClassLabels[deck.deckClass] ?? deck.deckClass})`,
        cardPack: deck.cardPack.name,
        cardPackId: deck.cardPack.id,
      })),
    [filteredDecks]
  );

  const summaryRecords = useMemo(() => {
    if (!deckId) return [];
    return filteredRecords.filter(
      (record) => record.deck.id === Number(deckId)
    );
  }, [deckId, filteredRecords]);

  const summary = useMemo(() => {
    const total = summaryRecords.length;
    const wins = summaryRecords.filter((record) => record.result === "WIN").length;
    const firstTotal = summaryRecords.filter(
      (record) => record.turn === "FIRST"
    ).length;
    const firstWins = summaryRecords.filter(
      (record) => record.turn === "FIRST" && record.result === "WIN"
    ).length;
    const secondTotal = summaryRecords.filter(
      (record) => record.turn === "SECOND"
    ).length;
    const secondWins = summaryRecords.filter(
      (record) => record.turn === "SECOND" && record.result === "WIN"
    ).length;
    return {
      total,
      wins,
      rate: total ? (wins / total) * 100 : null,
      firstRate: firstTotal ? (firstWins / firstTotal) * 100 : null,
      secondRate: secondTotal ? (secondWins / secondTotal) * 100 : null,
      firstTotal,
      secondTotal,
    };
  }, [filteredRecords, summaryRecords]);

  const totalPages = Math.max(1, Math.ceil(summaryRecords.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedRecords = summaryRecords.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!deckId || !opponentDeckId) {
      setError("デッキを選択してください。");
      return;
    }

    const payload = {
      deckId: Number(deckId),
      opponentDeckId: Number(opponentDeckId),
      turn,
      result,
      note,
    };

    const targetUrl = editingId
      ? `/api/match-records/${editingId}`
      : "/api/match-records";
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

    setOpponentDeckId("");
    setTurn("FIRST");
    setResult("WIN");
    setNote("");
    setEditingId(null);
    startTransition(() => router.refresh());
  };

  const onEdit = (record: MatchRecord) => {
    setDeckId(String(record.deck.id));
    setOpponentDeckId(String(record.opponentDeck.id));
    setTurn(record.turn);
    setResult(record.result);
    setNote(record.note ?? "");
    setEditingId(record.id);
  };

  const onCancelEdit = () => {
    setOpponentDeckId("");
    setTurn("FIRST");
    setResult("WIN");
    setNote("");
    setEditingId(null);
    setError(null);
  };

  const onDelete = async (id: number) => {
    setError(null);
    const res = await fetch(`/api/match-records/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "削除に失敗しました。");
      return;
    }

    setFlashMessage("削除しました！");
    startTransition(() => router.refresh());
  };

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-transparent">
        <div className="flex flex-wrap gap-2 px-4 pt-3">
          {cardPacks.map((pack) => (
            <button
              key={pack.id}
              type="button"
              className={`relative -mb-px rounded-t-xl border border-b-0 px-5 py-2 text-xs font-semibold transition ${
                activePackId === pack.id
                  ? "border-zinc-900 bg-white text-zinc-900"
                  : "border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-100"
              }`}
              onClick={() => setActivePackId(pack.id)}
            >
              {pack.name}
            </button>
          ))}
        </div>
        <div className="-mt-px rounded-t-2xl rounded-b-2xl border-x border-b border-white bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
              Records
            </p>
            <div className="w-full">
              <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                {editingId ? "戦績の編集" : "戦績の登録"}
              </h2>
            </div>
            <Link
              className="text-sm font-semibold text-blue-600 hover:text-blue-800"
              href="/settings"
            >
              デッキ追加はこちら
            </Link>
          </div>

          <div className="mt-6">
            <label className="flex flex-col gap-2 text-sm text-zinc-700 md:max-w-sm">
              使用デッキ
              <select
                className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none"
                value={deckId}
                onChange={(event) => {
                  setDeckId(event.target.value);
                  setOpponentDeckId("");
                }}
              >
                <option value="">選択してください</option>
                {deckOptions.map((deck) => (
                  <option key={deck.id} value={deck.id}>
                    {deck.label} / {deck.cardPack}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <form className="mt-6 grid gap-4 md:grid-cols-4" onSubmit={onSubmit}>
          <label className="flex flex-col gap-2 text-sm text-zinc-700 md:col-span-2">
            対戦デッキ
            <select
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none"
              value={opponentDeckId}
              onChange={(event) => setOpponentDeckId(event.target.value)}
            >
              <option value="">選択してください</option>
              {opponentOptions.map((deck) => (
                <option key={deck.id} value={deck.id}>
                  {deck.name} / {deck.cardPack.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm text-zinc-700">
            先攻/後攻
            <select
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none"
              value={turn}
              onChange={(event) =>
                setTurn(event.target.value as MatchRecord["turn"])
              }
            >
              <option value="FIRST">先攻</option>
              <option value="SECOND">後攻</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm text-zinc-700">
            勝敗
            <select
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none"
              value={result}
              onChange={(event) =>
                setResult(event.target.value as MatchRecord["result"])
              }
            >
              <option value="WIN">勝ち</option>
              <option value="LOSS">負け</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm text-zinc-700 md:col-span-4">
            備考
            <textarea
              className="min-h-[110px] rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="任意でメモを入力してください"
            />
          </label>
          <div className="flex flex-col gap-3 md:col-span-4 md:flex-row md:items-end md:justify-start">
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
          {flashMessage && (
            <div className="flash-in fixed left-1/2 top-4 z-50 w-[min(90vw,420px)] -translate-x-1/2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-center text-sm font-semibold text-emerald-700 shadow-sm">
              {flashMessage}
            </div>
          )}
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          <div className="mt-8 border-t border-zinc-200 pt-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
                Summary
              </p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                戦績サマリー
              </h3>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-zinc-700">
                <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wider text-zinc-400">
                  <tr>
                    <th className="px-3 py-2 text-center">全体勝率</th>
                    <th className="px-3 py-2 text-center">先攻勝率</th>
                    <th className="px-3 py-2 text-center">後攻勝率</th>
                    <th className="px-3 py-2 text-center">試合数</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-200">
                    <td className="px-3 py-3 text-center font-semibold text-zinc-900">
                      {formatRate(summary.rate)}
                    </td>
                    <td className="px-3 py-3 text-center">
                      {formatRate(summary.firstRate)}
                    </td>
                    <td className="px-3 py-3 text-center">
                      {formatRate(summary.secondRate)}
                    </td>
                    <td className="px-3 py-3 text-center">{summary.total}</td>
                  </tr>
                </tbody>
              </table>
              {!deckId && (
                <p className="mt-4 text-sm text-zinc-700">
                  デッキを選択してください。
                </p>
              )}
              {deckId && summary.total === 0 && (
                <p className="mt-4 text-sm text-zinc-700">
                  選択したデッキの戦績がありません。
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 border-t border-zinc-200 pt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-zinc-900">戦績一覧</h3>
              <span className="text-sm text-zinc-700">{summaryRecords.length}件</span>
            </div>
            <div className="mt-4 space-y-3">
              {summaryRecords.length === 0 && (
                <p className="text-sm text-zinc-700">まだ登録がありません。</p>
              )}
              {pagedRecords.map((record) => (
                <div
                  key={record.id}
                  className={`flex flex-wrap items-center justify-between gap-3 rounded-lg border px-4 py-3 ${
                    record.result === "WIN"
                      ? "border-emerald-100 bg-emerald-50"
                      : "border-rose-100 bg-rose-50"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-zinc-900">
                        {record.deck.name} vs {record.opponentDeck.name}
                      </p>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          record.result === "WIN"
                            ? "bg-emerald-600 text-white"
                            : "bg-rose-500 text-white"
                        }`}
                      >
                        {resultLabels[record.result]}
                      </span>
                    </div>
                    {record.note && (
                      <p className="mt-2 text-xs text-zinc-700">{record.note}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      className="text-sm font-semibold text-zinc-700 hover:text-zinc-900"
                      onClick={() => onEdit(record)}
                      type="button"
                    >
                      編集
                    </button>
                    <button
                      className="text-sm font-semibold text-red-600 hover:text-red-700"
                      onClick={() => onDelete(record.id)}
                      type="button"
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {summaryRecords.length > pageSize && (
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-zinc-700">
                  {currentPage}/{totalPages}ページ
                </p>
                <div className="flex items-center gap-2">
                  <button
                    className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                    onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    前へ
                  </button>
                  <button
                    className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                    onClick={() =>
                      setPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    次へ
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
