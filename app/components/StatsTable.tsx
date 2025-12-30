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

const buildMemberStats = (matchups: Matchup[]) => {
  const totals = new Map<number, { name: string; total: number; count: number }>();

  for (const matchup of matchups) {
    const entry = totals.get(matchup.user.id) ?? {
      name: matchup.user.name,
      total: 0,
      count: 0,
    };
    entry.total += matchup.winRate;
    entry.count += 1;
    totals.set(matchup.user.id, entry);
  }

  return Array.from(totals.entries()).map(([userId, value]) => ({
    userId,
    name: value.name,
    average: value.count ? value.total / value.count : null,
    count: value.count,
  }));
};

const buildMatchupMatrix = (decks: Deck[], matchups: Matchup[]) => {
  const lookup = new Map<string, number>();
  for (const matchup of matchups) {
    lookup.set(`${matchup.deck1.id}:${matchup.deck2.id}`, matchup.winRate);
  }

  return decks.map((row) =>
    decks.map((col) => {
      if (row.id === col.id) return null;
      const direct = lookup.get(`${row.id}:${col.id}`);
      if (direct !== undefined) return direct;
      const reverse = lookup.get(`${col.id}:${row.id}`);
      if (reverse !== undefined) return 100 - reverse;
      return undefined;
    })
  );
};

export default function StatsTable({ decks, matchups }: Props) {
  const stats = buildAverageStats(decks, matchups);
  const memberStats = buildMemberStats(matchups);
  const matchupMatrix = buildMatchupMatrix(decks, matchups);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
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
              <th className="w-44 border border-zinc-300 bg-white px-3 py-2 text-left text-zinc-500">
                デッキ
              </th>
              {decks.map((deck) => (
                <th
                  key={deck.id}
                  className="min-w-[110px] border border-zinc-300 bg-white px-2 py-2 text-xs text-zinc-500"
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
            {decks.map((rowDeck, rowIndex) => (
              <tr key={rowDeck.id}>
                <th className="border border-zinc-300 bg-white px-3 py-3 text-left text-sm font-semibold text-zinc-900">
                  {rowDeck.name}
                  <div className="text-xs font-normal text-zinc-500">
                    {deckClassLabels[rowDeck.deckClass] ?? rowDeck.deckClass}
                    {" / "}
                    {rowDeck.cardPack.name}
                  </div>
                </th>
                {decks.map((colDeck, colIndex) => {
                  const value = matchupMatrix[rowIndex]?.[colIndex];
                  const isSame = rowDeck.id === colDeck.id;
                  return (
                    <td
                      key={colDeck.id}
                      className="border border-zinc-300 px-2 py-3 text-sm"
                    >
                      {isSame ? (
                        <span className="text-base font-semibold text-zinc-400">
                          *
                        </span>
                      ) : value === undefined ? (
                        <span className="text-zinc-400">—</span>
                      ) : (
                        <span className="font-semibold text-zinc-900">
                          {value}
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
          <p className="mt-4 text-sm text-zinc-500">
            デッキが登録されていません。
          </p>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-zinc-900">
          メンバー別の平均相性
        </h3>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm text-zinc-700">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="px-3 py-2">メンバー</th>
                <th className="px-3 py-2 text-center">平均相性</th>
                <th className="px-3 py-2 text-center">評価数</th>
              </tr>
            </thead>
            <tbody>
              {memberStats
                .sort((a, b) => {
                  if (a.average === null && b.average === null) return 0;
                  if (a.average === null) return 1;
                  if (b.average === null) return -1;
                  return b.average - a.average;
                })
                .map((stat) => (
                <tr key={stat.userId} className="border-b border-zinc-100">
                  <td className="px-3 py-3 font-semibold text-zinc-900">
                    {stat.name}
                  </td>
                  <td className="px-3 py-3 text-center font-semibold text-zinc-900">
                    {stat.average === null ? "-" : stat.average.toFixed(1)}
                  </td>
                  <td className="px-3 py-3 text-center">{stat.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {memberStats.length === 0 && (
            <p className="mt-4 text-sm text-zinc-500">
              相性評価が登録されていません。
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
