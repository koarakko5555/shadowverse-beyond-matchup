"use client";

import { useEffect, useMemo, useState } from "react";

import StatsTable from "@/app/components/StatsTable";

type CardPack = {
  id: number;
  name: string;
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

type Matchup = {
  id: number;
  deck1: Deck;
  deck2: Deck;
  user: User;
  winRate: number;
};

type MatchRecord = {
  id: number;
  deck: Deck;
  opponentDeck: Deck;
  user: User;
  turn: "FIRST" | "SECOND";
  result: "WIN" | "LOSS";
};

type Props = {
  decks: Deck[];
  cardPacks: CardPack[];
  matchups: Matchup[];
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

export default function HomeDashboard({ decks, cardPacks, matchups, records }: Props) {
  const [activeTab, setActiveTab] = useState<"records" | "matchups">("records");
  const [activePackId, setActivePackId] = useState<number | null>(null);

  useEffect(() => {
    if (activePackId !== null || cardPacks.length === 0) return;
    setActivePackId(cardPacks[0].id);
  }, [activePackId, cardPacks]);

  const filteredDecks = useMemo(() => {
    if (!activePackId) return [];
    return decks.filter((deck) => deck.cardPack.id === activePackId);
  }, [activePackId, decks]);

  const filteredMatchups = useMemo(() => {
    if (!activePackId) return [];
    return matchups.filter(
      (matchup) =>
        matchup.deck1.cardPack.id === activePackId &&
        matchup.deck2.cardPack.id === activePackId
    );
  }, [activePackId, matchups]);

  const filteredRecords = useMemo(() => {
    if (!activePackId) return [];
    return records.filter((record) => record.deck.cardPack.id === activePackId);
  }, [activePackId, records]);

  const summary = useMemo(() => {
    const total = filteredRecords.length;
    const wins = filteredRecords.filter((record) => record.result === "WIN").length;
    const firstTotal = filteredRecords.filter(
      (record) => record.turn === "FIRST"
    ).length;
    const firstWins = filteredRecords.filter(
      (record) => record.turn === "FIRST" && record.result === "WIN"
    ).length;
    const secondTotal = filteredRecords.filter(
      (record) => record.turn === "SECOND"
    ).length;
    const secondWins = filteredRecords.filter(
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
  }, [filteredRecords]);

  const deckStats = useMemo(
    () => buildDeckStats(filteredDecks, filteredRecords),
    [filteredDecks, filteredRecords]
  );

  return (
    <div className="space-y-6">
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
        <div className="-mt-px rounded-t-2xl rounded-b-2xl border-x border-b border-zinc-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
              Home
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">HOME</h2>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                activeTab === "records"
                  ? "border-zinc-900 bg-white text-zinc-900"
                  : "border-zinc-200 text-zinc-700 hover:bg-zinc-100"
              }`}
              onClick={() => setActiveTab("records")}
            >
              戦績
            </button>
            <button
              type="button"
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                activeTab === "matchups"
                  ? "border-zinc-900 bg-white text-zinc-900"
                  : "border-zinc-200 text-zinc-700 hover:bg-zinc-100"
              }`}
              onClick={() => setActiveTab("matchups")}
            >
              相性
            </button>
          </div>
          {activeTab === "records" && (
            <div className="mt-8 border-t border-zinc-200 pt-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
                  Records
                </p>
                <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                  戦績サマリー
                </h3>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4">
                  <p className="text-xs text-zinc-700">全体勝率</p>
                  <p className="mt-2 text-2xl font-semibold text-zinc-900">
                    {formatRate(summary.rate)}
                    <span className="ml-2 text-sm text-zinc-700">
                      {summary.wins}/{summary.total}
                    </span>
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4">
                  <p className="text-xs text-zinc-700">先攻勝率</p>
                  <p className="mt-2 text-2xl font-semibold text-zinc-900">
                    {formatRate(summary.firstRate)}
                    <span className="ml-2 text-sm text-zinc-700">
                      {summary.firstTotal}
                    </span>
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4">
                  <p className="text-xs text-zinc-700">後攻勝率</p>
                  <p className="mt-2 text-2xl font-semibold text-zinc-900">
                    {formatRate(summary.secondRate)}
                    <span className="ml-2 text-sm text-zinc-700">
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
                      <tr key={stat.deckId} className="border-b border-zinc-200">
                        <td className="px-3 py-3 font-semibold text-zinc-900">
                          {stat.name}
                          <div className="text-xs font-normal text-zinc-700">
                            {deckClassLabels[stat.deckClass] ?? stat.deckClass}
                            {" / "}
                            {stat.cardPack}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-center font-semibold text-zinc-900">
                          {formatRate(
                            stat.total ? (stat.wins / stat.total) * 100 : null
                          )}
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
                  <p className="mt-4 text-sm text-zinc-700">
                    戦績が登録されていません。
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === "matchups" && (
            <div className="mt-8 border-t border-zinc-200 pt-8">
              <StatsTable
                decks={filteredDecks}
                matchups={filteredMatchups}
                embedded
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
