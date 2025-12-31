 "use client";

import { useEffect, useMemo, useState } from "react";

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

type Matchup = {
  id: number;
  deck1: Deck;
  deck2: Deck;
  user: User;
  winRate: number;
};

type Props = {
  decks: Deck[];
  matchups: Matchup[];
  embedded?: boolean;
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

const deckClassOrder = [
  "ELF",
  "ROYAL",
  "WITCH",
  "DRAGON",
  "NIGHTMARE",
  "BISHOP",
  "NEMESIS",
] as const;
const deckClassRank = new Map<string, number>(
  deckClassOrder.map((value, index) => [value, index])
);

const buildAverageStats = (decks: Deck[], matchups: Matchup[]) =>
  decks
    .map((deck) => {
      const scores: number[] = [];
      for (const matchup of matchups) {
        if (matchup.deck1.id === deck.id) {
          scores.push(matchup.winRate);
        } else if (matchup.deck2.id === deck.id) {
          scores.push(100 - matchup.winRate);
        }
      }
      const total = scores.reduce((sum, value) => sum + value, 0);
      const avg = scores.length ? total / scores.length : null;
      return {
        deckId: deck.id,
        name: deck.name,
        deckClass: deck.deckClass,
        cardPack: deck.cardPack.name,
        average: avg,
        count: scores.length,
      };
    })
    .sort((a, b) => {
      if (a.average === null && b.average === null) {
        return a.name.localeCompare(b.name, "ja-JP");
      }
      if (a.average === null) return 1;
      if (b.average === null) return -1;
      return b.average - a.average;
    });

const buildMatchupMatrix = (decks: Deck[], matchups: Matchup[]) => {
  const totals = new Map<string, { sum: number; count: number }>();
  for (const matchup of matchups) {
    const lowId = Math.min(matchup.deck1.id, matchup.deck2.id);
    const highId = Math.max(matchup.deck1.id, matchup.deck2.id);
    const key = `${lowId}:${highId}`;
    const winRateFromLow =
      matchup.deck1.id === lowId ? matchup.winRate : 100 - matchup.winRate;
    const entry = totals.get(key) ?? { sum: 0, count: 0 };
    entry.sum += winRateFromLow;
    entry.count += 1;
    totals.set(key, entry);
  }

  return decks.map((row) =>
    decks.map((col) => {
      if (row.id === col.id) return null;
      const lowId = Math.min(row.id, col.id);
      const highId = Math.max(row.id, col.id);
      const entry = totals.get(`${lowId}:${highId}`);
      if (!entry) return undefined;
      const avgFromLow = entry.sum / entry.count;
      return row.id === lowId ? avgFromLow : 100 - avgFromLow;
    })
  );
};

export default function StatsTable({ decks, matchups, embedded }: Props) {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const sortedDecks = useMemo(() => {
    return decks.slice().sort((a, b) => {
      const rankA = deckClassRank.get(a.deckClass) ?? 999;
      const rankB = deckClassRank.get(b.deckClass) ?? 999;
      if (rankA !== rankB) return rankA - rankB;
      return a.id - b.id;
    });
  }, [decks]);

  const users = useMemo(() => {
    const seen = new Map<number, string>();
    for (const matchup of matchups) {
      if (!seen.has(matchup.user.id)) {
        seen.set(matchup.user.id, matchup.user.name);
      }
    }
    return Array.from(seen.entries()).map(([id, name]) => ({ id, name }));
  }, [matchups]);

  useEffect(() => {
    if (activeTab !== null || users.length === 0) return;
    setActiveTab(users[0].id);
  }, [activeTab, users]);

  const formatRate = (value: number | null | undefined) => {
    if (value === null || value === undefined) return "-";
    return Number.isInteger(value) ? value.toString() : value.toFixed(1);
  };

  const stats = useMemo(
    () => buildAverageStats(sortedDecks, matchups),
    [sortedDecks, matchups]
  );
  const overallMatrix = useMemo(
    () => buildMatchupMatrix(sortedDecks, matchups),
    [sortedDecks, matchups]
  );
  const activeMatchups = useMemo(() => {
    if (!activeTab) return [];
    return matchups.filter((matchup) => matchup.user.id === activeTab);
  }, [activeTab, matchups]);
  const activeMatrix = useMemo(
    () => buildMatchupMatrix(sortedDecks, activeMatchups),
    [sortedDecks, activeMatchups]
  );

  return (
    <section
      className={
        embedded
          ? "bg-transparent"
          : "rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
      }
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
          Stats
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
          統計表示
        </h2>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full table-fixed border-collapse text-center text-sm text-zinc-700">
          <thead className="bg-white text-xs uppercase tracking-wider text-zinc-400">
            <tr>
              <th className="w-44 border border-zinc-200 bg-white px-3 py-2 text-left text-zinc-700">
                デッキ
              </th>
              {sortedDecks.map((deck) => (
                <th
                  key={deck.id}
                  className="min-w-[160px] border border-zinc-200 bg-white px-2 py-2 text-xs text-zinc-700"
                >
                  <div
                    className="max-w-[160px] text-center text-xs font-semibold text-zinc-900"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      lineHeight: "1.2",
                      minHeight: "2.4em",
                    }}
                  >
                    {deck.name}
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    {deckClassLabels[deck.deckClass] ?? deck.deckClass}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedDecks.map((rowDeck, rowIndex) => (
              <tr key={rowDeck.id}>
              <th className="min-w-[200px] border border-zinc-200 bg-white px-3 py-3 text-left text-sm font-semibold text-zinc-900">
                <div
                  className="max-w-[200px]"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    lineHeight: "1.2",
                    minHeight: "2.4em",
                  }}
                >
                  {rowDeck.name}
                </div>
                <div className="text-xs font-normal text-zinc-700">
                  {deckClassLabels[rowDeck.deckClass] ?? rowDeck.deckClass}
                  {" / "}
                  {rowDeck.cardPack.name}
                </div>
              </th>
                {sortedDecks.map((colDeck, colIndex) => {
                  const value = overallMatrix[rowIndex]?.[colIndex];
                  const isSame = rowDeck.id === colDeck.id;
                  return (
                    <td
                      key={colDeck.id}
                      className="border border-zinc-200 px-2 py-3 text-sm"
                    >
                      {isSame ? (
                        <span className="text-base font-semibold text-zinc-400">
                          *
                        </span>
                      ) : value === undefined ? (
                        <span className="text-zinc-400">—</span>
                      ) : (
                        <span className="font-semibold text-zinc-900">
                          {formatRate(value)}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {stats.length === 0 && (
          <p className="mt-4 text-sm text-zinc-700">
            デッキが登録されていません。
          </p>
        )}
      </div>

      <div className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-zinc-900">
            みんなの相性表
          </h3>
          <div className="flex flex-wrap gap-2">
            {users.map((user) => (
              <button
                key={user.id}
                type="button"
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  activeTab === user.id
                    ? "border-zinc-900 bg-white text-zinc-900"
                    : "border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                }`}
                onClick={() => setActiveTab(user.id)}
              >
                {user.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
        <table className="min-w-full table-fixed border-collapse text-center text-sm text-zinc-700">
          <thead className="bg-white text-xs uppercase tracking-wider text-zinc-400">
            <tr>
              <th className="w-44 border border-zinc-200 bg-white px-3 py-2 text-left text-zinc-700">
                デッキ
              </th>
              {sortedDecks.map((deck) => (
                <th
                  key={deck.id}
                  className="min-w-[110px] border border-zinc-200 bg-white px-2 py-2 text-xs text-zinc-700"
                >
                    <div className="font-semibold text-zinc-900">{deck.name}</div>
                    <div className="text-[10px] text-zinc-400">
                      {deckClassLabels[deck.deckClass] ?? deck.deckClass}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
            {sortedDecks.map((rowDeck, rowIndex) => (
              <tr key={rowDeck.id}>
                <th className="border border-zinc-200 bg-white px-3 py-3 text-left text-sm font-semibold text-zinc-900">
                  {rowDeck.name}
                    <div className="text-xs font-normal text-zinc-700">
                      {deckClassLabels[rowDeck.deckClass] ?? rowDeck.deckClass}
                      {" / "}
                      {rowDeck.cardPack.name}
                    </div>
                  </th>
                {sortedDecks.map((colDeck, colIndex) => {
                  const value = activeMatrix[rowIndex]?.[colIndex];
                  const isSame = rowDeck.id === colDeck.id;
                  return (
                      <td
                        key={colDeck.id}
                        className="border border-zinc-200 px-2 py-3 text-sm"
                      >
                        {isSame ? (
                          <span className="text-base font-semibold text-zinc-400">
                            *
                          </span>
                        ) : value === undefined ? (
                          <span className="text-zinc-400">—</span>
                        ) : (
                          <span className="font-semibold text-zinc-900">
                            {formatRate(value)}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <p className="mt-4 text-sm text-zinc-700">
              相性評価が登録されていません。
            </p>
          )}
          {activeTab && activeMatchups.length === 0 && (
            <p className="mt-4 text-sm text-zinc-700">
              選択したメンバーの相性評価がありません。
            </p>
          )}
          {!activeTab && users.length > 0 && (
            <p className="mt-4 text-sm text-zinc-700">
              メンバーを選択してください。
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
