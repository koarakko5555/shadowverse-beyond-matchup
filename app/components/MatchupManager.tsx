"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";

import StatsTable from "@/app/components/StatsTable";

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
  cardPacks: CardPack[];
  matchups: Matchup[];
  statsMatchups: Matchup[];
  isAdmin: boolean;
  isPublic: boolean;
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
const deckClassRank = new Map(deckClassOrder.map((value, index) => [value, index]));

const winRateOptions = Array.from({ length: 21 }, (_, index) => index * 5);

type MatrixCell =
  | { type: "self" }
  | { type: "empty"; deck1Id: number; deck2Id: number }
  | {
      type: "value";
      deck1Id: number;
      deck2Id: number;
      value: number;
      recordId: number;
      storedDeck1Id: number;
      storedDeck2Id: number;
      reversed: boolean;
    };

const buildMatrix = (decks: Deck[], matchups: Matchup[]) => {
  const direct = new Map<string, Matchup>();
  for (const matchup of matchups) {
    direct.set(`${matchup.deck1.id}:${matchup.deck2.id}`, matchup);
  }

  const matrix: MatrixCell[][] = decks.map((row) =>
    decks.map((col) => {
      if (row.id === col.id) return { type: "self" };
      const key = `${row.id}:${col.id}`;
      const reverseKey = `${col.id}:${row.id}`;
      const directMatch = direct.get(key);
      if (directMatch) {
        return {
          type: "value",
          deck1Id: row.id,
          deck2Id: col.id,
          value: directMatch.winRate,
          recordId: directMatch.id,
          storedDeck1Id: directMatch.deck1.id,
          storedDeck2Id: directMatch.deck2.id,
          reversed: false,
        };
      }
      const reverseMatch = direct.get(reverseKey);
      if (reverseMatch) {
        return {
          type: "value",
          deck1Id: row.id,
          deck2Id: col.id,
          value: 100 - reverseMatch.winRate,
          recordId: reverseMatch.id,
          storedDeck1Id: reverseMatch.deck1.id,
          storedDeck2Id: reverseMatch.deck2.id,
          reversed: true,
        };
      }
      return { type: "empty", deck1Id: row.id, deck2Id: col.id };
    })
  );

  return matrix;
};

export default function MatchupManager({
  decks,
  cardPacks,
  matchups,
  statsMatchups,
  isAdmin,
  isPublic,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [matrixEdit, setMatrixEdit] = useState<{
    deck1Id: number;
    deck2Id: number;
    recordId?: number;
    storedDeck1Id?: number;
    storedDeck2Id?: number;
    reversed?: boolean;
  } | null>(null);
  const [lastSaved, setLastSaved] = useState<{
    deck1Id: number;
    deck2Id: number;
    value: number;
  } | null>(null);
  const [matrixWinRate, setMatrixWinRate] = useState("");
  const [matrixMessage, setMatrixMessage] = useState<string | null>(null);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deckName, setDeckName] = useState("");
  const [deckClass, setDeckClass] = useState("");
  const [cardPackId, setCardPackId] = useState("");
  const [editingDeckId, setEditingDeckId] = useState<number | null>(null);
  const [activePackId, setActivePackId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"input" | "stats">("input");
  const [isPublicMatchup, setIsPublicMatchup] = useState(isPublic);
  const deckFormRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activePackId !== null || cardPacks.length === 0) return;
    setActivePackId(cardPacks[0].id);
  }, [activePackId, cardPacks]);

  useEffect(() => {
    if (!flashMessage) return;
    const timer = setTimeout(() => setFlashMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [flashMessage]);

  useEffect(() => {
    if (!matrixMessage) return;
    const timer = setTimeout(() => setMatrixMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [matrixMessage]);

  useEffect(() => {
    if (!activePackId) return;
    setCardPackId(String(activePackId));
  }, [activePackId]);

  useEffect(() => {
    setIsPublicMatchup(isPublic);
  }, [isPublic]);

  const filteredDecks = useMemo(() => {
    if (!activePackId) return [];
    return decks.filter((deck) => deck.cardPack.id === activePackId);
  }, [activePackId, decks]);
  const sortedDecks = useMemo(() => {
    return filteredDecks.slice().sort((a, b) => {
      const rankA = deckClassRank.get(a.deckClass) ?? 999;
      const rankB = deckClassRank.get(b.deckClass) ?? 999;
      if (rankA !== rankB) return rankA - rankB;
      return a.id - b.id;
    });
  }, [filteredDecks]);
  const filteredStatsMatchups = useMemo(() => {
    if (!activePackId) return [];
    return statsMatchups.filter(
      (matchup) => matchup.deck1.cardPack.id === activePackId
    );
  }, [activePackId, statsMatchups]);

  const filteredMatchups = useMemo(() => {
    if (!activePackId) return [];
    return matchups.filter(
      (matchup) =>
        matchup.deck1.cardPack.id === activePackId &&
        matchup.deck2.cardPack.id === activePackId
    );
  }, [activePackId, matchups]);

  const matchupMatrix = useMemo(
    () => buildMatrix(sortedDecks, filteredMatchups),
    [sortedDecks, filteredMatchups]
  );
  const currentValue = useMemo(() => {
    if (!lastSaved) return null;
    const rowIndex = sortedDecks.findIndex(
      (deck) => deck.id === lastSaved.deck1Id
    );
    const colIndex = sortedDecks.findIndex(
      (deck) => deck.id === lastSaved.deck2Id
    );
    if (rowIndex < 0 || colIndex < 0) return null;
    const cell = matchupMatrix[rowIndex]?.[colIndex];
    if (!cell || cell.type !== "value") return null;
    return cell.value;
  }, [sortedDecks, matchupMatrix, lastSaved]);

  useEffect(() => {
    if (!lastSaved || currentValue === null) return;
    if (Math.abs(currentValue - lastSaved.value) < 0.001) {
      setLastSaved(null);
    }
  }, [currentValue, lastSaved]);

  const overrideValue = (rowId: number, colId: number) => {
    if (!matrixEdit) return null;
    if (matrixWinRate === "") return null;
    const raw = Number(matrixWinRate);
    if (!Number.isFinite(raw)) return null;
    if (rowId === matrixEdit.deck1Id && colId === matrixEdit.deck2Id) {
      return raw;
    }
    if (rowId === matrixEdit.deck2Id && colId === matrixEdit.deck1Id) {
      return 100 - raw;
    }
    return null;
  };

  const pendingOverrideValue = (rowId: number, colId: number) => {
    if (!lastSaved) return null;
    if (rowId === lastSaved.deck1Id && colId === lastSaved.deck2Id) {
      return lastSaved.value;
    }
    if (rowId === lastSaved.deck2Id && colId === lastSaved.deck1Id) {
      return 100 - lastSaved.value;
    }
    return null;
  };

  const onMatrixSelect = (cell: MatrixCell) => {
    if (cell.type === "self") return;
    setError(null);
    setFlashMessage(null);
    setMatrixEdit({
      deck1Id: cell.deck1Id,
      deck2Id: cell.deck2Id,
      recordId: cell.type === "value" ? cell.recordId : undefined,
      storedDeck1Id: cell.type === "value" ? cell.storedDeck1Id : undefined,
      storedDeck2Id: cell.type === "value" ? cell.storedDeck2Id : undefined,
      reversed: cell.type === "value" ? cell.reversed : undefined,
    });
    setMatrixWinRate(cell.type === "value" ? String(cell.value) : "");
  };

  const onMatrixSave = async () => {
    if (!matrixEdit) return;
    if (matrixWinRate === "") {
      setError("相性評価を選択してください。");
      return;
    }
    const inputRate = Number(matrixWinRate);
    if (!Number.isFinite(inputRate)) {
      setError("相性評価を選択してください。");
      return;
    }
    const payload = {
      deck1Id: matrixEdit.recordId
        ? (matrixEdit.storedDeck1Id ?? matrixEdit.deck1Id)
        : matrixEdit.deck1Id,
      deck2Id: matrixEdit.recordId
        ? (matrixEdit.storedDeck2Id ?? matrixEdit.deck2Id)
        : matrixEdit.deck2Id,
      winRate:
        matrixEdit.recordId && matrixEdit.reversed ? 100 - inputRate : inputRate,
    };
    const targetUrl = matrixEdit.recordId
      ? `/api/matchups/${matrixEdit.recordId}`
      : "/api/matchups";
    const method = matrixEdit.recordId ? "PUT" : "POST";
    const res = await fetch(targetUrl, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "更新に失敗しました。");
      return;
    }
    setMatrixEdit(null);
    setMatrixWinRate("");
    setLastSaved({
      deck1Id: matrixEdit.deck1Id,
      deck2Id: matrixEdit.deck2Id,
      value: Number(matrixWinRate),
    });
    setMatrixMessage("更新しました！");
    setFlashMessage(null);
    startTransition(() => router.refresh());
  };

  const onMatrixDelete = async () => {
    if (!matrixEdit?.recordId) return;
    const res = await fetch(`/api/matchups/${matrixEdit.recordId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "削除に失敗しました。");
      return;
    }
    setMatrixEdit(null);
    setMatrixWinRate("");
    setFlashMessage("削除しました！");
    startTransition(() => router.refresh());
  };

  const onDeckSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (deckName.trim().length < 1 || deckName.trim().length > 100) {
      setError("デッキ名は1〜100文字で入力してください。");
      return;
    }
    if (!deckClass) {
      setError("クラスを選択してください。");
      return;
    }
    if (!cardPackId) {
      setError("カードパックを選択してください。");
      return;
    }

    const targetUrl = editingDeckId ? `/api/decks/${editingDeckId}` : "/api/decks";
    const method = editingDeckId ? "PUT" : "POST";
    const res = await fetch(targetUrl, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: deckName.trim(),
        deckClass,
        cardPackId: Number(cardPackId),
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "登録に失敗しました。");
      return;
    }

    setDeckName("");
    setDeckClass("");
    setCardPackId(activePackId ? String(activePackId) : "");
    setEditingDeckId(null);
    setFlashMessage(null);
    startTransition(() => router.refresh());
  };

  const onDeckEdit = (deck: Deck) => {
    setDeckName(deck.name);
    setDeckClass(deck.deckClass);
    setCardPackId(String(deck.cardPack.id));
    setEditingDeckId(deck.id);
    setActiveTab("input");
    setError(null);
    setTimeout(() => {
      deckFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const onDeckDelete = async (id: number) => {
    setError(null);
    const res = await fetch(`/api/decks/${id}`, { method: "DELETE" });
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
        <div className="-mt-px rounded-t-2xl rounded-b-2xl border-x border-b border-zinc-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
              Matchups
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
              相性登録
            </h2>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                activeTab === "input"
                  ? "border-zinc-900 bg-white text-zinc-900"
                  : "border-zinc-200 text-zinc-700 hover:bg-zinc-100"
              }`}
              onClick={() => setActiveTab("input")}
            >
              相性入力
            </button>
            <button
              type="button"
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                activeTab === "stats"
                  ? "border-zinc-900 bg-white text-zinc-900"
                  : "border-zinc-200 text-zinc-700 hover:bg-zinc-100"
              }`}
              onClick={() => setActiveTab("stats")}
            >
              統計
            </button>
          </div>

          {activeTab === "stats" && (
            <div className="mt-8 border-t border-zinc-200 pt-8">
              <StatsTable
                decks={sortedDecks}
                matchups={filteredStatsMatchups}
                embedded
              />
            </div>
          )}

          {flashMessage && (
            <div className="flash-in fixed left-1/2 top-4 z-50 w-[min(90vw,420px)] -translate-x-1/2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-center text-sm font-semibold text-emerald-700 shadow-sm">
              {flashMessage}
            </div>
          )}
          {activeTab === "input" && matrixMessage && (
            <div className="flash-in fixed left-1/2 top-4 z-50 w-[min(90vw,420px)] -translate-x-1/2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-center text-sm font-semibold text-emerald-700 shadow-sm">
              {matrixMessage}
            </div>
          )}

          {activeTab === "input" && (
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
                        className="min-w-[110px] border border-zinc-200 bg-white px-2 py-2 text-xs text-zinc-700"
                      >
                        <div className="font-semibold text-zinc-900">
                          {deck.name}
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
                      </th>
                      {sortedDecks.map((colDeck, colIndex) => {
                        const cell = matchupMatrix[rowIndex]?.[colIndex];
                        const isSelf = cell?.type === "self";
                        const display =
                          cell?.type === "value" ? cell.value : undefined;
                        const override =
                          overrideValue(rowDeck.id, colDeck.id) ??
                          pendingOverrideValue(rowDeck.id, colDeck.id);
                        return (
                          <td
                            key={colDeck.id}
                            className={`border border-zinc-200 px-2 py-3 text-sm ${
                              isSelf ? "bg-zinc-50" : "hover:bg-zinc-100"
                            }`}
                          >
                            {isSelf ? (
                              <span className="text-base font-semibold text-zinc-400">
                                *
                              </span>
                            ) : (
                              <button
                                type="button"
                                className="w-full font-semibold text-zinc-900"
                                onClick={() => cell && onMatrixSelect(cell)}
                              >
                                {override !== null
                                  ? override
                                  : display === undefined
                                    ? "—"
                                    : display}
                              </button>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              {sortedDecks.length === 0 && (
                <p className="mt-4 text-sm text-zinc-700">
                  このカードパックのデッキがありません。
                </p>
              )}
            </div>
          )}
          {activeTab === "input" && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm">
              <div>
                <p className="font-semibold text-zinc-900">相性表の公開設定</p>
                <p className="text-xs text-zinc-700">
                  公開にすると、統計タブであなたの相性表が集計されます。
                </p>
              </div>
              <label className="flex items-center gap-3 text-xs font-semibold text-zinc-700">
                <span>{isPublicMatchup ? "公開" : "非公開"}</span>
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={isPublicMatchup}
                  onChange={async () => {
                    const nextValue = !isPublicMatchup;
                    setIsPublicMatchup(nextValue);
                    setError(null);
                    try {
                      const res = await fetch(
                        "/api/settings/matchup-visibility",
                        {
                          method: "PATCH",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ isPublic: nextValue }),
                        }
                      );
                      if (!res.ok) {
                        const data = await res.json().catch(() => null);
                        throw new Error(data?.error ?? "更新に失敗しました。");
                      }
                      setFlashMessage("更新しました！");
                      startTransition(() => router.refresh());
                    } catch (err) {
                      setIsPublicMatchup(!nextValue);
                      setError(
                        err instanceof Error
                          ? err.message
                          : "更新に失敗しました。"
                      );
                    }
                  }}
                />
                <span className="relative inline-flex h-6 w-11 items-center rounded-full border border-zinc-200 bg-zinc-100 transition peer-checked:border-emerald-600 peer-checked:bg-emerald-600">
                  <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
                </span>
              </label>
            </div>
          )}

          {activeTab === "input" && matrixEdit && (
            <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    相性の編集
                  </p>
                  <p className="text-xs text-zinc-700">
                    {filteredDecks.find((deck) => deck.id === matrixEdit.deck1Id)
                      ?.name}{" "}
                    vs{" "}
                    {filteredDecks.find((deck) => deck.id === matrixEdit.deck2Id)
                      ?.name}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none"
                    value={matrixWinRate}
                    onChange={(event) => setMatrixWinRate(event.target.value)}
                  >
                    <option value="">選択してください</option>
                    {winRateOptions.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800"
                    onClick={onMatrixSave}
                  >
                    保存
                  </button>
                  {matrixEdit.recordId && (
                    <button
                      type="button"
                      className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
                      onClick={onMatrixDelete}
                    >
                      削除
                    </button>
                  )}
                  <button
                    type="button"
                    className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
                    onClick={() => setMatrixEdit(null)}
                  >
                    閉じる
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "input" && (
            <div
              ref={deckFormRef}
              className="mt-10 border-t border-zinc-200 pt-8"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
                  Decks
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                  {editingDeckId ? "デッキの編集" : "デッキ追加"}
                </h2>
                {editingDeckId && (
                  <p className="mt-2 text-sm text-emerald-600">
                    編集中のデッキが選択されています。内容を更新して保存してください。
                  </p>
                )}
              </div>

              <form
                className="mt-6 grid gap-4 md:grid-cols-3"
                onSubmit={onDeckSubmit}
              >
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
                <label className="flex flex-col gap-2 text-sm text-zinc-700 md:col-span-2">
                  デッキ名
                  <input
                    className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none"
                    value={deckName}
                    onChange={(event) => setDeckName(event.target.value)}
                    placeholder="デッキ名を入力"
                  />
                </label>
                <div className="flex flex-col gap-2 text-sm text-zinc-700 md:col-span-2">
                  カードパック
                  <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
                    {cardPacks.find((pack) => pack.id === activePackId)?.name ??
                      "未選択"}
                  </div>
                </div>
              <div className="flex items-end">
                <button
                  className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
                  type="submit"
                  disabled={isPending}
                >
                  {editingDeckId ? "更新する" : "追加する"}
                </button>
              </div>
              {editingDeckId && (
                <button
                  type="button"
                  className="w-full rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 md:col-span-3 md:w-auto"
                  onClick={() => {
                    setDeckName("");
                    setDeckClass("");
                    setCardPackId(activePackId ? String(activePackId) : "");
                    setEditingDeckId(null);
                  }}
                >
                  編集をやめる
                </button>
              )}
            </form>
              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            </div>
          )}

          {activeTab === "input" && (
            <div className="mt-10 border-t border-zinc-200 pt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-900">
                  登録済みデッキ
                </h3>
                <span className="text-sm text-zinc-700">
                  {sortedDecks.length}件
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {sortedDecks.length === 0 && (
                  <p className="text-sm text-zinc-700">まだ登録がありません。</p>
                )}
                {sortedDecks.map((deck) => (
                  <div
                    key={deck.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">
                        {deck.name}
                      </p>
                      <p className="text-xs text-zinc-700">
                        {deckClassLabels[deck.deckClass] ?? deck.deckClass} /{" "}
                        {deck.cardPack.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        className="text-sm font-semibold text-zinc-700 hover:text-zinc-900"
                        onClick={() => onDeckEdit(deck)}
                        type="button"
                      >
                        編集
                      </button>
                      {isAdmin && (
                        <button
                          className="text-sm font-semibold text-red-600 hover:text-red-700"
                          onClick={() => onDeckDelete(deck.id)}
                          type="button"
                        >
                          削除
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
