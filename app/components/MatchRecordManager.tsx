"use client";

import { useMemo, useState, useTransition } from "react";
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

type DeckStats = {
  deckId: number;
  name: string;
  deckClass: string;
  cardPack: string;
  total: number;
  wins: number;
  firstTotal: number;
  firstWins: number;
  secondTotal: number;
  secondWins: number;
};

const formatRate = (value: number | null) =>
  value === null ? "-" : Number.isInteger(value) ? `${value}` : value.toFixed(1);

const buildDeckStats = (decks: Deck[], records: MatchRecord[]) => {
  const byDeck = new Map<number, DeckStats>();

  for (const deck of decks) {
    byDeck.set(deck.id, {
      deckId: deck.id,
      name: deck.name,
      deckClass: deck.deckClass,
      cardPack: deck.cardPack.name,
      total: 0,
      wins: 0,
      firstTotal: 0,
      firstWins: 0,
      secondTotal: 0,
      secondWins: 0,
    });
  }

  for (const record of records) {
    const entry = byDeck.get(record.deck.id);
    if (!entry) continue;
    entry.total += 1;
    if (record.result === "WIN") entry.wins += 1;
    if (record.turn === "FIRST") {
      entry.firstTotal += 1;
      if (record.result === "WIN") entry.firstWins += 1;
    } else {
      entry.secondTotal += 1;
      if (record.result === "WIN") entry.secondWins += 1;
    }
  }

  return Array.from(byDeck.values())
    .filter((stat) => stat.total > 0)
    .sort((a, b) => b.total - a.total);
};

export default function MatchRecordManager({ decks, records }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deckId, setDeckId] = useState("");
  const [opponentDeckId, setOpponentDeckId] = useState("");
  const [turn, setTurn] = useState<MatchRecord["turn"]>("FIRST");
  const [result, setResult] = useState<MatchRecord["result"]>("WIN");
  const [note, setNote] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overall" | number>("overall");

  const users = useMemo(() => {
    const seen = new Map<number, string>();
    for (const record of records) {
      if (!seen.has(record.user.id)) {
        seen.set(record.user.id, record.user.name);
      }
    }
    return Array.from(seen.entries()).map(([id, name]) => ({ id, name }));
  }, [records]);

  const selectedDeck = useMemo(
    () => decks.find((deck) => deck.id === Number(deckId)),
    [deckId, decks]
  );

  const opponentOptions = useMemo(() => {
    if (!selectedDeck) return decks;
    return decks.filter((deck) => deck.cardPack.id === selectedDeck.cardPack.id);
  }, [decks, selectedDeck]);

  const deckOptions = useMemo(
    () =>
      decks.map((deck) => ({
        id: deck.id,
        label: `${deck.name} (${deckClassLabels[deck.deckClass] ?? deck.deckClass})`,
        cardPack: deck.cardPack.name,
        cardPackId: deck.cardPack.id,
      })),
    [decks]
  );

  const activeRecords = useMemo(() => {
    if (activeTab === "overall") return records;
    return records.filter((record) => record.user.id === activeTab);
  }, [activeTab, records]);

  const summary = useMemo(() => {
    const total = activeRecords.length;
    const wins = activeRecords.filter((record) => record.result === "WIN").length;
    const firstTotal = activeRecords.filter(
      (record) => record.turn === "FIRST"
    ).length;
    const firstWins = activeRecords.filter(
      (record) => record.turn === "FIRST" && record.result === "WIN"
    ).length;
    const secondTotal = activeRecords.filter(
      (record) => record.turn === "SECOND"
    ).length;
    const secondWins = activeRecords.filter(
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
  }, [activeRecords]);

  const deckStats = useMemo(
    () => buildDeckStats(decks, activeRecords),
    [decks, activeRecords]
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

    setDeckId("");
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
    setDeckId("");
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

    startTransition(() => router.refresh());
  };

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
            Records
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            {editingId ? "戦績の編集" : "戦績の登録"}
          </h2>
        </div>

        <form className="mt-6 grid gap-4 md:grid-cols-4" onSubmit={onSubmit}>
          <label className="flex flex-col gap-2 text-sm text-zinc-700 md:col-span-2">
            自分のデッキ
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
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
            Summary
          </p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-900">
            勝率サマリー
          </h3>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
              activeTab === "overall"
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-200 text-zinc-600 hover:bg-zinc-100"
            }`}
            onClick={() => setActiveTab("overall")}
          >
            全体
          </button>
          {users.map((user) => (
            <button
              key={user.id}
              type="button"
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                activeTab === user.id
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-200 text-zinc-600 hover:bg-zinc-100"
              }`}
              onClick={() => setActiveTab(user.id)}
            >
              {user.name}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4">
            <p className="text-xs text-zinc-500">全体勝率</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900">
              {formatRate(summary.rate)}
              <span className="ml-2 text-sm text-zinc-500">
                {summary.wins}/{summary.total}
              </span>
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4">
            <p className="text-xs text-zinc-500">先攻勝率</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900">
              {formatRate(summary.firstRate)}
              <span className="ml-2 text-sm text-zinc-500">
                {summary.firstTotal}
              </span>
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4">
            <p className="text-xs text-zinc-500">後攻勝率</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900">
              {formatRate(summary.secondRate)}
              <span className="ml-2 text-sm text-zinc-500">
                {summary.secondTotal}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm text-zinc-700">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="px-3 py-2">デッキ</th>
                <th className="px-3 py-2 text-center">全体勝率</th>
                <th className="px-3 py-2 text-center">先攻勝率</th>
                <th className="px-3 py-2 text-center">後攻勝率</th>
                <th className="px-3 py-2 text-center">試合数</th>
              </tr>
            </thead>
            <tbody>
              {deckStats.map((stat) => (
                <tr key={stat.deckId} className="border-b border-zinc-100">
                  <td className="px-3 py-3 font-semibold text-zinc-900">
                    {stat.name}
                    <div className="text-xs font-normal text-zinc-500">
                      {deckClassLabels[stat.deckClass] ?? stat.deckClass}
                      {" / "}
                      {stat.cardPack}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center font-semibold text-zinc-900">
                    {formatRate(stat.total ? (stat.wins / stat.total) * 100 : null)}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {formatRate(
                      stat.firstTotal
                        ? (stat.firstWins / stat.firstTotal) * 100
                        : null
                    )}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {formatRate(
                      stat.secondTotal
                        ? (stat.secondWins / stat.secondTotal) * 100
                        : null
                    )}
                  </td>
                  <td className="px-3 py-3 text-center">{stat.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {deckStats.length === 0 && (
            <p className="mt-4 text-sm text-zinc-500">
              戦績が登録されていません。
            </p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-900">戦績一覧</h3>
          <span className="text-sm text-zinc-500">{records.length}件</span>
        </div>
        <div className="mt-4 space-y-3">
          {records.length === 0 && (
            <p className="text-sm text-zinc-500">まだ登録がありません。</p>
          )}
          {records.map((record) => (
            <div
              key={record.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-900">
                  {record.deck.name} vs {record.opponentDeck.name}
                </p>
                <p className="text-xs text-zinc-500">
                  登録: {record.user.name} ・{turnLabels[record.turn]} ・
                  {resultLabels[record.result]}
                </p>
                {record.note && (
                  <p className="mt-2 text-xs text-zinc-600">{record.note}</p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    record.result === "WIN"
                      ? "bg-emerald-500 text-white"
                      : "bg-rose-500 text-white"
                  }`}
                >
                  {resultLabels[record.result]}
                </span>
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
      </section>
    </div>
  );
}
