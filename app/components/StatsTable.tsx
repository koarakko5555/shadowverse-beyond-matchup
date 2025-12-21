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

export default function StatsTable({ decks, matchups }: Props) {
  const stats = buildAverageStats(decks, matchups);
  const memberStats = buildMemberStats(matchups);

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
        <table className="min-w-full text-left text-sm text-zinc-700">
          <thead className="border-b border-zinc-200 text-xs uppercase tracking-wider text-zinc-400">
            <tr>
              <th className="px-3 py-2">デッキ</th>
              <th className="px-3 py-2">クラス</th>
              <th className="px-3 py-2">カードパック</th>
              <th className="px-3 py-2">平均相性</th>
              <th className="px-3 py-2">評価数</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => (
              <tr key={stat.deckId} className="border-b border-zinc-100">
                <td className="px-3 py-3 font-semibold text-zinc-900">
                  {stat.name}
                </td>
                <td className="px-3 py-3">
                  {deckClassLabels[stat.deckClass] ?? stat.deckClass}
                </td>
                <td className="px-3 py-3">{stat.cardPack}</td>
                <td className="px-3 py-3">
                  {stat.average === null ? "-" : stat.average.toFixed(1)}
                </td>
                <td className="px-3 py-3">{stat.count}</td>
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
            <thead className="border-b border-zinc-200 text-xs uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="px-3 py-2">メンバー</th>
                <th className="px-3 py-2">平均相性</th>
                <th className="px-3 py-2">評価数</th>
              </tr>
            </thead>
            <tbody>
              {memberStats.map((stat) => (
                <tr key={stat.userId} className="border-b border-zinc-100">
                  <td className="px-3 py-3 font-semibold text-zinc-900">
                    {stat.name}
                  </td>
                  <td className="px-3 py-3">
                    {stat.average === null ? "-" : stat.average.toFixed(1)}
                  </td>
                  <td className="px-3 py-3">{stat.count}</td>
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
