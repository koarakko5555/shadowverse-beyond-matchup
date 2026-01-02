(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/StatsTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StatsTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const deckClassLabels = {
    ELF: "エルフ",
    ROYAL: "ロイヤル",
    WITCH: "ウィッチ",
    NIGHTMARE: "ナイトメア",
    DRAGON: "ドラゴン",
    BISHOP: "ビショップ",
    NEMESIS: "ネメシス"
};
const deckClassOrder = [
    "ELF",
    "ROYAL",
    "WITCH",
    "DRAGON",
    "NIGHTMARE",
    "BISHOP",
    "NEMESIS"
];
const deckClassRank = new Map(deckClassOrder.map((value, index)=>[
        value,
        index
    ]));
const buildAverageStats = (decks, matchups)=>decks.map((deck)=>{
        const scores = [];
        for (const matchup of matchups){
            if (matchup.deck1.id === deck.id) {
                scores.push(matchup.winRate);
            } else if (matchup.deck2.id === deck.id) {
                scores.push(100 - matchup.winRate);
            }
        }
        const total = scores.reduce((sum, value)=>sum + value, 0);
        const avg = scores.length ? total / scores.length : null;
        return {
            deckId: deck.id,
            name: deck.name,
            deckClass: deck.deckClass,
            cardPack: deck.cardPack.name,
            average: avg,
            count: scores.length
        };
    }).sort((a, b)=>{
        if (a.average === null && b.average === null) {
            return a.name.localeCompare(b.name, "ja-JP");
        }
        if (a.average === null) return 1;
        if (b.average === null) return -1;
        return b.average - a.average;
    });
const buildMatchupMatrix = (decks, matchups)=>{
    const totals = new Map();
    for (const matchup of matchups){
        const lowId = Math.min(matchup.deck1.id, matchup.deck2.id);
        const highId = Math.max(matchup.deck1.id, matchup.deck2.id);
        const key = `${lowId}:${highId}`;
        const winRateFromLow = matchup.deck1.id === lowId ? matchup.winRate : 100 - matchup.winRate;
        const entry = totals.get(key) ?? {
            sum: 0,
            count: 0
        };
        entry.sum += winRateFromLow;
        entry.count += 1;
        totals.set(key, entry);
    }
    return decks.map((row)=>decks.map((col)=>{
            if (row.id === col.id) return null;
            const lowId = Math.min(row.id, col.id);
            const highId = Math.max(row.id, col.id);
            const entry = totals.get(`${lowId}:${highId}`);
            if (!entry) return undefined;
            const avgFromLow = entry.sum / entry.count;
            return row.id === lowId ? avgFromLow : 100 - avgFromLow;
        }));
};
function StatsTable({ decks, matchups, embedded }) {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const sortedDecks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StatsTable.useMemo[sortedDecks]": ()=>{
            return decks.slice().sort({
                "StatsTable.useMemo[sortedDecks]": (a, b)=>{
                    const rankA = deckClassRank.get(a.deckClass) ?? 999;
                    const rankB = deckClassRank.get(b.deckClass) ?? 999;
                    if (rankA !== rankB) return rankA - rankB;
                    return a.id - b.id;
                }
            }["StatsTable.useMemo[sortedDecks]"]);
        }
    }["StatsTable.useMemo[sortedDecks]"], [
        decks
    ]);
    const users = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StatsTable.useMemo[users]": ()=>{
            const seen = new Map();
            for (const matchup of matchups){
                if (!seen.has(matchup.user.id)) {
                    seen.set(matchup.user.id, matchup.user.name);
                }
            }
            return Array.from(seen.entries()).map({
                "StatsTable.useMemo[users]": ([id, name])=>({
                        id,
                        name
                    })
            }["StatsTable.useMemo[users]"]);
        }
    }["StatsTable.useMemo[users]"], [
        matchups
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StatsTable.useEffect": ()=>{
            if (activeTab !== null || users.length === 0) return;
            setActiveTab(users[0].id);
        }
    }["StatsTable.useEffect"], [
        activeTab,
        users
    ]);
    const formatRate = (value)=>{
        if (value === null || value === undefined) return "-";
        return Number.isInteger(value) ? value.toString() : value.toFixed(1);
    };
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StatsTable.useMemo[stats]": ()=>buildAverageStats(sortedDecks, matchups)
    }["StatsTable.useMemo[stats]"], [
        sortedDecks,
        matchups
    ]);
    const overallMatrix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StatsTable.useMemo[overallMatrix]": ()=>buildMatchupMatrix(sortedDecks, matchups)
    }["StatsTable.useMemo[overallMatrix]"], [
        sortedDecks,
        matchups
    ]);
    const activeMatchups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StatsTable.useMemo[activeMatchups]": ()=>{
            if (!activeTab) return [];
            return matchups.filter({
                "StatsTable.useMemo[activeMatchups]": (matchup)=>matchup.user.id === activeTab
            }["StatsTable.useMemo[activeMatchups]"]);
        }
    }["StatsTable.useMemo[activeMatchups]"], [
        activeTab,
        matchups
    ]);
    const activeMatrix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StatsTable.useMemo[activeMatrix]": ()=>buildMatchupMatrix(sortedDecks, activeMatchups)
    }["StatsTable.useMemo[activeMatrix]"], [
        sortedDecks,
        activeMatchups
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: embedded ? "bg-transparent" : "rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400",
                        children: "Stats"
                    }, void 0, false, {
                        fileName: "[project]/app/components/StatsTable.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mt-2 text-2xl font-semibold text-zinc-900",
                        children: "統計表示"
                    }, void 0, false, {
                        fileName: "[project]/app/components/StatsTable.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/StatsTable.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 overflow-x-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "min-w-full table-fixed border-collapse text-center text-sm text-zinc-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "bg-white text-xs uppercase tracking-wider text-zinc-400",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "w-44 border border-zinc-200 bg-white px-3 py-2 text-left text-zinc-700",
                                            children: "デッキ"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/StatsTable.tsx",
                                            lineNumber: 186,
                                            columnNumber: 15
                                        }, this),
                                        sortedDecks.map((deck)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "min-w-[160px] border border-zinc-200 bg-white px-2 py-2 text-xs text-zinc-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "max-w-[160px] text-center text-xs font-semibold text-zinc-900",
                                                        style: {
                                                            display: "-webkit-box",
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: "vertical",
                                                            overflow: "hidden",
                                                            lineHeight: "1.2",
                                                            minHeight: "2.4em"
                                                        },
                                                        children: deck.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 194,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] text-zinc-400",
                                                        children: deckClassLabels[deck.deckClass] ?? deck.deckClass
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 207,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, deck.id, true, {
                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                lineNumber: 190,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/StatsTable.tsx",
                                    lineNumber: 185,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/StatsTable.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: sortedDecks.map((rowDeck, rowIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "min-w-[200px] border border-zinc-200 bg-white px-3 py-3 text-left text-sm font-semibold text-zinc-900",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "max-w-[200px]",
                                                        style: {
                                                            display: "-webkit-box",
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: "vertical",
                                                            overflow: "hidden",
                                                            lineHeight: "1.2",
                                                            minHeight: "2.4em"
                                                        },
                                                        children: rowDeck.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 218,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs font-normal text-zinc-700",
                                                        children: [
                                                            deckClassLabels[rowDeck.deckClass] ?? rowDeck.deckClass,
                                                            " / ",
                                                            rowDeck.cardPack.name
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 231,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                lineNumber: 217,
                                                columnNumber: 15
                                            }, this),
                                            sortedDecks.map((colDeck, colIndex)=>{
                                                const value = overallMatrix[rowIndex]?.[colIndex];
                                                const isSame = rowDeck.id === colDeck.id;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "border border-zinc-200 px-2 py-3 text-sm",
                                                    children: isSame ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-base font-semibold text-zinc-400",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 246,
                                                        columnNumber: 25
                                                    }, this) : value === undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-zinc-400",
                                                        children: "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 250,
                                                        columnNumber: 25
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-zinc-900",
                                                        children: formatRate(value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 25
                                                    }, this)
                                                }, colDeck.id, false, {
                                                    fileName: "[project]/app/components/StatsTable.tsx",
                                                    lineNumber: 241,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        ]
                                    }, rowDeck.id, true, {
                                        fileName: "[project]/app/components/StatsTable.tsx",
                                        lineNumber: 216,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/StatsTable.tsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/StatsTable.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this),
                    stats.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-sm text-zinc-700",
                        children: "デッキが登録されていません。"
                    }, void 0, false, {
                        fileName: "[project]/app/components/StatsTable.tsx",
                        lineNumber: 264,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/StatsTable.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold text-zinc-900",
                                children: "みんなの相性表"
                            }, void 0, false, {
                                fileName: "[project]/app/components/StatsTable.tsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: users.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: `rounded-full border px-4 py-2 text-xs font-semibold transition ${activeTab === user.id ? "border-zinc-900 bg-white text-zinc-900" : "border-zinc-200 text-zinc-700 hover:bg-zinc-100"}`,
                                        onClick: ()=>setActiveTab(user.id),
                                        children: user.name
                                    }, user.id, false, {
                                        fileName: "[project]/app/components/StatsTable.tsx",
                                        lineNumber: 277,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/StatsTable.tsx",
                                lineNumber: 275,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/StatsTable.tsx",
                        lineNumber: 271,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 overflow-x-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "min-w-full table-fixed border-collapse text-center text-sm text-zinc-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        className: "bg-white text-xs uppercase tracking-wider text-zinc-400",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "w-44 border border-zinc-200 bg-white px-3 py-2 text-left text-zinc-700",
                                                    children: "デッキ"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/StatsTable.tsx",
                                                    lineNumber: 297,
                                                    columnNumber: 15
                                                }, this),
                                                sortedDecks.map((deck)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "min-w-[160px] border border-zinc-200 bg-white px-2 py-2 text-xs text-zinc-700",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "max-w-[160px] text-center text-xs font-semibold text-zinc-900",
                                                                style: {
                                                                    display: "-webkit-box",
                                                                    WebkitLineClamp: 2,
                                                                    WebkitBoxOrient: "vertical",
                                                                    overflow: "hidden",
                                                                    lineHeight: "1.2",
                                                                    minHeight: "2.4em"
                                                                },
                                                                children: deck.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                                lineNumber: 305,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-[10px] text-zinc-400",
                                                                children: deckClassLabels[deck.deckClass] ?? deck.deckClass
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                                lineNumber: 318,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, deck.id, true, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 301,
                                                        columnNumber: 17
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/StatsTable.tsx",
                                            lineNumber: 296,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/StatsTable.tsx",
                                        lineNumber: 295,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: sortedDecks.map((rowDeck, rowIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "min-w-[200px] border border-zinc-200 bg-white px-3 py-3 text-left text-sm font-semibold text-zinc-900",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "max-w-[200px]",
                                                                style: {
                                                                    display: "-webkit-box",
                                                                    WebkitLineClamp: 2,
                                                                    WebkitBoxOrient: "vertical",
                                                                    overflow: "hidden",
                                                                    lineHeight: "1.2",
                                                                    minHeight: "2.4em"
                                                                },
                                                                children: rowDeck.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                                lineNumber: 329,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs font-normal text-zinc-700",
                                                                children: [
                                                                    deckClassLabels[rowDeck.deckClass] ?? rowDeck.deckClass,
                                                                    " / ",
                                                                    rowDeck.cardPack.name
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                                lineNumber: 342,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 328,
                                                        columnNumber: 17
                                                    }, this),
                                                    sortedDecks.map((colDeck, colIndex)=>{
                                                        const value = activeMatrix[rowIndex]?.[colIndex];
                                                        const isSame = rowDeck.id === colDeck.id;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "border border-zinc-200 px-2 py-3 text-sm",
                                                            children: isSame ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-base font-semibold text-zinc-400",
                                                                children: "*"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                                lineNumber: 357,
                                                                columnNumber: 27
                                                            }, this) : value === undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-zinc-400",
                                                                children: "—"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                                lineNumber: 361,
                                                                columnNumber: 27
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-zinc-900",
                                                                children: formatRate(value)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                                lineNumber: 363,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, colDeck.id, false, {
                                                            fileName: "[project]/app/components/StatsTable.tsx",
                                                            lineNumber: 352,
                                                            columnNumber: 23
                                                        }, this);
                                                    })
                                                ]
                                            }, rowDeck.id, true, {
                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                lineNumber: 327,
                                                columnNumber: 15
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/StatsTable.tsx",
                                        lineNumber: 325,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/StatsTable.tsx",
                                lineNumber: 294,
                                columnNumber: 9
                            }, this),
                            users.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-sm text-zinc-700",
                                children: "相性評価が登録されていません。"
                            }, void 0, false, {
                                fileName: "[project]/app/components/StatsTable.tsx",
                                lineNumber: 375,
                                columnNumber: 13
                            }, this),
                            activeTab && activeMatchups.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-sm text-zinc-700",
                                children: "選択したメンバーの相性評価がありません。"
                            }, void 0, false, {
                                fileName: "[project]/app/components/StatsTable.tsx",
                                lineNumber: 380,
                                columnNumber: 13
                            }, this),
                            !activeTab && users.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-sm text-zinc-700",
                                children: "メンバーを選択してください。"
                            }, void 0, false, {
                                fileName: "[project]/app/components/StatsTable.tsx",
                                lineNumber: 385,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/StatsTable.tsx",
                        lineNumber: 293,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/StatsTable.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/StatsTable.tsx",
        lineNumber: 166,
        columnNumber: 5
    }, this);
}
_s(StatsTable, "Kw5AyTAK1+CE97NjoYDB+1x50vc=");
_c = StatsTable;
var _c;
__turbopack_context__.k.register(_c, "StatsTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/MatchupManager.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MatchupManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$StatsTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/StatsTable.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const deckClassLabels = {
    ELF: "エルフ",
    ROYAL: "ロイヤル",
    WITCH: "ウィッチ",
    NIGHTMARE: "ナイトメア",
    DRAGON: "ドラゴン",
    BISHOP: "ビショップ",
    NEMESIS: "ネメシス"
};
const deckClassOrder = [
    "ELF",
    "ROYAL",
    "WITCH",
    "DRAGON",
    "NIGHTMARE",
    "BISHOP",
    "NEMESIS"
];
const deckClassRank = new Map(deckClassOrder.map((value, index)=>[
        value,
        index
    ]));
const winRateOptions = Array.from({
    length: 21
}, (_, index)=>index * 5);
const buildMatrix = (decks, matchups)=>{
    const direct = new Map();
    for (const matchup of matchups){
        direct.set(`${matchup.deck1.id}:${matchup.deck2.id}`, matchup);
    }
    const matrix = decks.map((row)=>decks.map((col)=>{
            if (row.id === col.id) return {
                type: "self"
            };
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
                    reversed: false
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
                    reversed: true
                };
            }
            return {
                type: "empty",
                deck1Id: row.id,
                deck2Id: col.id
            };
        }));
    return matrix;
};
function MatchupManager({ decks, cardPacks, matchups, statsMatchups, isAdmin, isPublic }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    const [matrixEdit, setMatrixEdit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lastSaved, setLastSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [matrixWinRate, setMatrixWinRate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [matrixMessage, setMatrixMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [flashMessage, setFlashMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deckName, setDeckName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [deckClass, setDeckClass] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [cardPackId, setCardPackId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editingDeckId, setEditingDeckId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activePackId, setActivePackId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("input");
    const [isPublicMatchup, setIsPublicMatchup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(isPublic);
    const deckFormRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const matrixEditRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchupManager.useEffect": ()=>{
            if (activePackId !== null || cardPacks.length === 0) return;
            setActivePackId(cardPacks[0].id);
        }
    }["MatchupManager.useEffect"], [
        activePackId,
        cardPacks
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchupManager.useEffect": ()=>{
            if (!flashMessage) return;
            const timer = setTimeout({
                "MatchupManager.useEffect.timer": ()=>setFlashMessage(null)
            }["MatchupManager.useEffect.timer"], 3000);
            return ({
                "MatchupManager.useEffect": ()=>clearTimeout(timer)
            })["MatchupManager.useEffect"];
        }
    }["MatchupManager.useEffect"], [
        flashMessage
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchupManager.useEffect": ()=>{
            if (!matrixMessage) return;
            const timer = setTimeout({
                "MatchupManager.useEffect.timer": ()=>setMatrixMessage(null)
            }["MatchupManager.useEffect.timer"], 3000);
            return ({
                "MatchupManager.useEffect": ()=>clearTimeout(timer)
            })["MatchupManager.useEffect"];
        }
    }["MatchupManager.useEffect"], [
        matrixMessage
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchupManager.useEffect": ()=>{
            if (!activePackId) return;
            setCardPackId(String(activePackId));
        }
    }["MatchupManager.useEffect"], [
        activePackId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchupManager.useEffect": ()=>{
            setIsPublicMatchup(isPublic);
        }
    }["MatchupManager.useEffect"], [
        isPublic
    ]);
    const filteredDecks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchupManager.useMemo[filteredDecks]": ()=>{
            if (!activePackId) return [];
            return decks.filter({
                "MatchupManager.useMemo[filteredDecks]": (deck)=>deck.cardPack.id === activePackId
            }["MatchupManager.useMemo[filteredDecks]"]);
        }
    }["MatchupManager.useMemo[filteredDecks]"], [
        activePackId,
        decks
    ]);
    const sortedDecks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchupManager.useMemo[sortedDecks]": ()=>{
            return filteredDecks.slice().sort({
                "MatchupManager.useMemo[sortedDecks]": (a, b)=>{
                    const rankA = deckClassRank.get(a.deckClass) ?? 999;
                    const rankB = deckClassRank.get(b.deckClass) ?? 999;
                    if (rankA !== rankB) return rankA - rankB;
                    return a.id - b.id;
                }
            }["MatchupManager.useMemo[sortedDecks]"]);
        }
    }["MatchupManager.useMemo[sortedDecks]"], [
        filteredDecks
    ]);
    const filteredStatsMatchups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchupManager.useMemo[filteredStatsMatchups]": ()=>{
            if (!activePackId) return [];
            return statsMatchups.filter({
                "MatchupManager.useMemo[filteredStatsMatchups]": (matchup)=>matchup.deck1.cardPack.id === activePackId
            }["MatchupManager.useMemo[filteredStatsMatchups]"]);
        }
    }["MatchupManager.useMemo[filteredStatsMatchups]"], [
        activePackId,
        statsMatchups
    ]);
    const filteredMatchups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchupManager.useMemo[filteredMatchups]": ()=>{
            if (!activePackId) return [];
            return matchups.filter({
                "MatchupManager.useMemo[filteredMatchups]": (matchup)=>matchup.deck1.cardPack.id === activePackId && matchup.deck2.cardPack.id === activePackId
            }["MatchupManager.useMemo[filteredMatchups]"]);
        }
    }["MatchupManager.useMemo[filteredMatchups]"], [
        activePackId,
        matchups
    ]);
    const matchupMatrix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchupManager.useMemo[matchupMatrix]": ()=>buildMatrix(sortedDecks, filteredMatchups)
    }["MatchupManager.useMemo[matchupMatrix]"], [
        sortedDecks,
        filteredMatchups
    ]);
    const currentValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchupManager.useMemo[currentValue]": ()=>{
            if (!lastSaved) return null;
            const rowIndex = sortedDecks.findIndex({
                "MatchupManager.useMemo[currentValue].rowIndex": (deck)=>deck.id === lastSaved.deck1Id
            }["MatchupManager.useMemo[currentValue].rowIndex"]);
            const colIndex = sortedDecks.findIndex({
                "MatchupManager.useMemo[currentValue].colIndex": (deck)=>deck.id === lastSaved.deck2Id
            }["MatchupManager.useMemo[currentValue].colIndex"]);
            if (rowIndex < 0 || colIndex < 0) return null;
            const cell = matchupMatrix[rowIndex]?.[colIndex];
            if (!cell || cell.type !== "value") return null;
            return cell.value;
        }
    }["MatchupManager.useMemo[currentValue]"], [
        sortedDecks,
        matchupMatrix,
        lastSaved
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MatchupManager.useEffect": ()=>{
            if (!lastSaved || currentValue === null) return;
            if (Math.abs(currentValue - lastSaved.value) < 0.001) {
                setLastSaved(null);
            }
        }
    }["MatchupManager.useEffect"], [
        currentValue,
        lastSaved
    ]);
    const overrideValue = (rowId, colId)=>{
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
    const pendingOverrideValue = (rowId, colId)=>{
        if (!lastSaved) return null;
        if (rowId === lastSaved.deck1Id && colId === lastSaved.deck2Id) {
            return lastSaved.value;
        }
        if (rowId === lastSaved.deck2Id && colId === lastSaved.deck1Id) {
            return 100 - lastSaved.value;
        }
        return null;
    };
    const onMatrixSelect = (cell)=>{
        if (cell.type === "self") return;
        setError(null);
        setFlashMessage(null);
        setMatrixEdit({
            deck1Id: cell.deck1Id,
            deck2Id: cell.deck2Id,
            recordId: cell.type === "value" ? cell.recordId : undefined,
            storedDeck1Id: cell.type === "value" ? cell.storedDeck1Id : undefined,
            storedDeck2Id: cell.type === "value" ? cell.storedDeck2Id : undefined,
            reversed: cell.type === "value" ? cell.reversed : undefined
        });
        setMatrixWinRate(cell.type === "value" ? String(cell.value) : "");
        if ("TURBOPACK compile-time truthy", 1) {
            const isMobile = window.matchMedia("(max-width: 768px)").matches;
            if (isMobile) {
                setTimeout(()=>{
                    matrixEditRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }, 0);
            }
        }
    };
    const onMatrixSave = async ()=>{
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
            deck1Id: matrixEdit.recordId ? matrixEdit.storedDeck1Id ?? matrixEdit.deck1Id : matrixEdit.deck1Id,
            deck2Id: matrixEdit.recordId ? matrixEdit.storedDeck2Id ?? matrixEdit.deck2Id : matrixEdit.deck2Id,
            winRate: matrixEdit.recordId && matrixEdit.reversed ? 100 - inputRate : inputRate
        };
        const targetUrl = matrixEdit.recordId ? `/api/matchups/${matrixEdit.recordId}` : "/api/matchups";
        const method = matrixEdit.recordId ? "PUT" : "POST";
        const res = await fetch(targetUrl, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        if (!res.ok) {
            const data = await res.json().catch(()=>({}));
            setError(data?.error ?? "更新に失敗しました。");
            return;
        }
        setMatrixEdit(null);
        setMatrixWinRate("");
        setLastSaved({
            deck1Id: matrixEdit.deck1Id,
            deck2Id: matrixEdit.deck2Id,
            value: Number(matrixWinRate)
        });
        setMatrixMessage("更新しました！");
        setFlashMessage(null);
        startTransition(()=>router.refresh());
    };
    const onMatrixDelete = async ()=>{
        if (!matrixEdit?.recordId) return;
        const res = await fetch(`/api/matchups/${matrixEdit.recordId}`, {
            method: "DELETE"
        });
        if (!res.ok) {
            const data = await res.json().catch(()=>({}));
            setError(data?.error ?? "削除に失敗しました。");
            return;
        }
        setMatrixEdit(null);
        setMatrixWinRate("");
        setFlashMessage("削除しました！");
        startTransition(()=>router.refresh());
    };
    const onDeckSubmit = async (event)=>{
        event.preventDefault();
        setError(null);
        if (deckName.trim().length < 1 || deckName.trim().length > 10) {
            setError("デッキ名は1〜10文字で入力してください。");
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
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: deckName.trim(),
                deckClass,
                cardPackId: Number(cardPackId)
            })
        });
        if (!res.ok) {
            const data = await res.json().catch(()=>({}));
            setError(data?.error ?? "登録に失敗しました。");
            return;
        }
        setDeckName("");
        setDeckClass("");
        setCardPackId(activePackId ? String(activePackId) : "");
        setEditingDeckId(null);
        setFlashMessage(null);
        startTransition(()=>router.refresh());
    };
    const onDeckEdit = (deck)=>{
        setDeckName(deck.name);
        setDeckClass(deck.deckClass);
        setCardPackId(String(deck.cardPack.id));
        setEditingDeckId(deck.id);
        setActiveTab("input");
        setError(null);
        setTimeout(()=>{
            deckFormRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 0);
    };
    const onDeckDelete = async (id)=>{
        setError(null);
        const res = await fetch(`/api/decks/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) {
            const data = await res.json().catch(()=>({}));
            setError(data?.error ?? "削除に失敗しました。");
            return;
        }
        setFlashMessage("削除しました！");
        startTransition(()=>router.refresh());
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "rounded-2xl bg-transparent",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-2 px-4 pt-3",
                    children: cardPacks.map((pack)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: `relative -mb-px rounded-t-xl border border-b-0 px-5 py-2 text-xs font-semibold transition ${activePackId === pack.id ? "border-zinc-900 bg-white text-zinc-900" : "border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-100"}`,
                            onClick: ()=>setActivePackId(pack.id),
                            children: pack.name
                        }, pack.id, false, {
                            fileName: "[project]/app/components/MatchupManager.tsx",
                            lineNumber: 428,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/components/MatchupManager.tsx",
                    lineNumber: 426,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "-mt-px rounded-t-2xl rounded-b-2xl border-x border-b border-zinc-200 bg-white p-6 shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400",
                                    children: "Matchups"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MatchupManager.tsx",
                                    lineNumber: 444,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mt-2 text-2xl font-semibold text-zinc-900",
                                    children: "相性登録"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MatchupManager.tsx",
                                    lineNumber: 447,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/MatchupManager.tsx",
                            lineNumber: 443,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 flex flex-wrap gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: `rounded-full border px-4 py-2 text-xs font-semibold transition ${activeTab === "input" ? "border-zinc-900 bg-white text-zinc-900" : "border-zinc-200 text-zinc-700 hover:bg-zinc-100"}`,
                                    onClick: ()=>setActiveTab("input"),
                                    children: "相性入力"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MatchupManager.tsx",
                                    lineNumber: 452,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: `rounded-full border px-4 py-2 text-xs font-semibold transition ${activeTab === "stats" ? "border-zinc-900 bg-white text-zinc-900" : "border-zinc-200 text-zinc-700 hover:bg-zinc-100"}`,
                                    onClick: ()=>setActiveTab("stats"),
                                    children: "統計"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MatchupManager.tsx",
                                    lineNumber: 463,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/MatchupManager.tsx",
                            lineNumber: 451,
                            columnNumber: 11
                        }, this),
                        activeTab === "stats" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 border-t border-zinc-200 pt-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$StatsTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                decks: sortedDecks,
                                matchups: filteredStatsMatchups,
                                embedded: true
                            }, void 0, false, {
                                fileName: "[project]/app/components/MatchupManager.tsx",
                                lineNumber: 478,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/MatchupManager.tsx",
                            lineNumber: 477,
                            columnNumber: 13
                        }, this),
                        flashMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flash-in fixed left-1/2 top-4 z-50 w-[min(90vw,420px)] -translate-x-1/2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-center text-sm font-semibold text-emerald-700 shadow-sm",
                            children: flashMessage
                        }, void 0, false, {
                            fileName: "[project]/app/components/MatchupManager.tsx",
                            lineNumber: 487,
                            columnNumber: 13
                        }, this),
                        activeTab === "input" && matrixMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flash-in fixed left-1/2 top-4 z-50 w-[min(90vw,420px)] -translate-x-1/2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-center text-sm font-semibold text-emerald-700 shadow-sm",
                            children: matrixMessage
                        }, void 0, false, {
                            fileName: "[project]/app/components/MatchupManager.tsx",
                            lineNumber: 492,
                            columnNumber: 13
                        }, this),
                        activeTab === "input" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full table-fixed border-collapse text-center text-[11px] text-zinc-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            className: "bg-white text-xs uppercase tracking-wider text-zinc-400",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "w-[18%] border border-zinc-200 bg-white px-2 py-2 text-left text-zinc-700",
                                                        children: "デッキ"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/MatchupManager.tsx",
                                                        lineNumber: 502,
                                                        columnNumber: 21
                                                    }, this),
                                                    sortedDecks.map((deck)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "border border-zinc-200 bg-white px-1 py-2 text-zinc-700",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-center font-semibold text-zinc-900",
                                                                style: {
                                                                    display: "-webkit-box",
                                                                    WebkitLineClamp: 2,
                                                                    WebkitBoxOrient: "vertical",
                                                                    overflow: "hidden",
                                                                    lineHeight: "1.2",
                                                                    minHeight: "2.4em"
                                                                },
                                                                children: deck.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/MatchupManager.tsx",
                                                                lineNumber: 510,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, deck.id, false, {
                                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                                            lineNumber: 506,
                                                            columnNumber: 23
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/MatchupManager.tsx",
                                                lineNumber: 501,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                            lineNumber: 500,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: sortedDecks.map((rowDeck, rowIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "border border-zinc-200 bg-white px-2 py-3 text-left font-semibold text-zinc-900",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "whitespace-normal",
                                                                style: {
                                                                    display: "-webkit-box",
                                                                    WebkitLineClamp: 2,
                                                                    WebkitBoxOrient: "vertical",
                                                                    overflow: "hidden",
                                                                    lineHeight: "1.2",
                                                                    minHeight: "2.4em"
                                                                },
                                                                children: rowDeck.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/MatchupManager.tsx",
                                                                lineNumber: 531,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                                            lineNumber: 530,
                                                            columnNumber: 23
                                                        }, this),
                                                        sortedDecks.map((colDeck, colIndex)=>{
                                                            const cell = matchupMatrix[rowIndex]?.[colIndex];
                                                            const isSelf = cell?.type === "self";
                                                            const display = cell?.type === "value" ? cell.value : undefined;
                                                            const override = overrideValue(rowDeck.id, colDeck.id) ?? pendingOverrideValue(rowDeck.id, colDeck.id);
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: `border border-zinc-200 px-2 py-3 text-sm ${isSelf ? "bg-zinc-50" : "hover:bg-zinc-100"}`,
                                                                children: isSelf ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-base font-semibold text-zinc-400",
                                                                    children: "*"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/MatchupManager.tsx",
                                                                    lineNumber: 561,
                                                                    columnNumber: 31
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "w-full font-semibold text-zinc-900",
                                                                    onClick: ()=>cell && onMatrixSelect(cell),
                                                                    children: override !== null ? override : display === undefined ? "—" : display
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/MatchupManager.tsx",
                                                                    lineNumber: 565,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, colDeck.id, false, {
                                                                fileName: "[project]/app/components/MatchupManager.tsx",
                                                                lineNumber: 554,
                                                                columnNumber: 27
                                                            }, this);
                                                        })
                                                    ]
                                                }, rowDeck.id, true, {
                                                    fileName: "[project]/app/components/MatchupManager.tsx",
                                                    lineNumber: 529,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                            lineNumber: 527,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/MatchupManager.tsx",
                                    lineNumber: 499,
                                    columnNumber: 15
                                }, this),
                                sortedDecks.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-4 text-sm text-zinc-700",
                                    children: "このカードパックのデッキがありません。"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MatchupManager.tsx",
                                    lineNumber: 585,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/MatchupManager.tsx",
                            lineNumber: 498,
                            columnNumber: 13
                        }, this),
                        activeTab === "input" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-semibold text-zinc-900",
                                            children: "相性表の公開設定"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                            lineNumber: 594,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-zinc-700",
                                            children: "公開にすると、統計タブであなたの相性表が集計されます。"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                            lineNumber: 595,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/MatchupManager.tsx",
                                    lineNumber: 593,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex items-center gap-3 text-xs font-semibold text-zinc-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: isPublicMatchup ? "公開" : "非公開"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                            lineNumber: 600,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            className: "peer sr-only",
                                            checked: isPublicMatchup,
                                            onChange: async ()=>{
                                                const nextValue = !isPublicMatchup;
                                                setIsPublicMatchup(nextValue);
                                                setError(null);
                                                try {
                                                    const res = await fetch("/api/settings/matchup-visibility", {
                                                        method: "PATCH",
                                                        headers: {
                                                            "Content-Type": "application/json"
                                                        },
                                                        body: JSON.stringify({
                                                            isPublic: nextValue
                                                        })
                                                    });
                                                    if (!res.ok) {
                                                        const data = await res.json().catch(()=>null);
                                                        throw new Error(data?.error ?? "更新に失敗しました。");
                                                    }
                                                    setFlashMessage("更新しました！");
                                                    startTransition(()=>router.refresh());
                                                } catch (err) {
                                                    setIsPublicMatchup(!nextValue);
                                                    setError(err instanceof Error ? err.message : "更新に失敗しました。");
                                                }
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                            lineNumber: 601,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "relative inline-flex h-6 w-11 items-center rounded-full border border-zinc-200 bg-zinc-100 transition peer-checked:border-emerald-600 peer-checked:bg-emerald-600",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MatchupManager.tsx",
                                                lineNumber: 635,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                            lineNumber: 634,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/MatchupManager.tsx",
                                    lineNumber: 599,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/MatchupManager.tsx",
                            lineNumber: 592,
                            columnNumber: 13
                        }, this),
                        activeTab === "input" && matrixEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: matrixEditRef,
                            className: "mt-6 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center justify-between gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold text-zinc-900",
                                                children: "相性の編集"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MatchupManager.tsx",
                                                lineNumber: 648,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-zinc-700",
                                                children: [
                                                    filteredDecks.find((deck)=>deck.id === matrixEdit.deck1Id)?.name,
                                                    " ",
                                                    "vs",
                                                    " ",
                                                    filteredDecks.find((deck)=>deck.id === matrixEdit.deck2Id)?.name
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/MatchupManager.tsx",
                                                lineNumber: 651,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/MatchupManager.tsx",
                                        lineNumber: 647,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none",
                                                value: matrixWinRate,
                                                onChange: (event)=>setMatrixWinRate(event.target.value),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "選択してください"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/MatchupManager.tsx",
                                                        lineNumber: 665,
                                                        columnNumber: 21
                                                    }, this),
                                                    winRateOptions.map((value)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: value,
                                                            children: value
                                                        }, value, false, {
                                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                                            lineNumber: 667,
                                                            columnNumber: 23
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/MatchupManager.tsx",
                                                lineNumber: 660,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800",
                                                onClick: onMatrixSave,
                                                children: "保存"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MatchupManager.tsx",
                                                lineNumber: 672,
                                                columnNumber: 19
                                            }, this),
                                            matrixEdit.recordId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-lg border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100",
                                                onClick: onMatrixDelete,
                                                children: "削除"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MatchupManager.tsx",
                                                lineNumber: 680,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "rounded-lg border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100",
                                                onClick: ()=>setMatrixEdit(null),
                                                children: "閉じる"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MatchupManager.tsx",
                                                lineNumber: 688,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/MatchupManager.tsx",
                                        lineNumber: 659,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/MatchupManager.tsx",
                                lineNumber: 646,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/MatchupManager.tsx",
                            lineNumber: 642,
                            columnNumber: 13
                        }, this),
                        activeTab === "input" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: deckFormRef,
                            className: "mt-10 border-t border-zinc-200 pt-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400",
                                            children: "Decks"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                            lineNumber: 706,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "mt-2 text-2xl font-semibold text-zinc-900",
                                            children: editingDeckId ? "デッキの編集" : "デッキ追加"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                            lineNumber: 709,
                                            columnNumber: 17
                                        }, this),
                                        editingDeckId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-sm text-emerald-600",
                                            children: "編集中のデッキが選択されています。内容を更新して保存してください。"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                            lineNumber: 713,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/MatchupManager.tsx",
                                    lineNumber: 705,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    className: "mt-6 grid gap-4 md:grid-cols-3",
                                    onSubmit: onDeckSubmit,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex flex-col gap-2 text-sm text-zinc-700",
                                            children: [
                                                "クラス",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: "rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none",
                                                    value: deckClass,
                                                    onChange: (event)=>setDeckClass(event.target.value),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "選択してください"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                                            lineNumber: 730,
                                                            columnNumber: 21
                                                        }, this),
                                                        Object.entries(deckClassLabels).map(([value, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: value,
                                                                children: label
                                                            }, value, false, {
                                                                fileName: "[project]/app/components/MatchupManager.tsx",
                                                                lineNumber: 732,
                                                                columnNumber: 23
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/MatchupManager.tsx",
                                                    lineNumber: 725,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                            lineNumber: 723,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex flex-col gap-2 text-sm text-zinc-700 md:col-span-2",
                                            children: [
                                                "デッキ名",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none",
                                                    value: deckName,
                                                    onChange: (event)=>setDeckName(event.target.value),
                                                    placeholder: "デッキ名を入力",
                                                    maxLength: 10
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/MatchupManager.tsx",
                                                    lineNumber: 740,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                            lineNumber: 738,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-2 text-sm text-zinc-700 md:col-span-2",
                                            children: [
                                                "カードパック",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700",
                                                    children: cardPacks.find((pack)=>pack.id === activePackId)?.name ?? "未選択"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/MatchupManager.tsx",
                                                    lineNumber: 750,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                            lineNumber: 748,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-end",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400",
                                                type: "submit",
                                                disabled: isPending,
                                                children: editingDeckId ? "更新する" : "追加する"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MatchupManager.tsx",
                                                lineNumber: 756,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                            lineNumber: 755,
                                            columnNumber: 15
                                        }, this),
                                        editingDeckId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "w-full rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 md:col-span-3 md:w-auto",
                                            onClick: ()=>{
                                                setDeckName("");
                                                setDeckClass("");
                                                setCardPackId(activePackId ? String(activePackId) : "");
                                                setEditingDeckId(null);
                                            },
                                            children: "編集をやめる"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                            lineNumber: 765,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/MatchupManager.tsx",
                                    lineNumber: 719,
                                    columnNumber: 15
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 text-sm text-red-600",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MatchupManager.tsx",
                                    lineNumber: 779,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/MatchupManager.tsx",
                            lineNumber: 701,
                            columnNumber: 13
                        }, this),
                        activeTab === "input" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-10 border-t border-zinc-200 pt-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-semibold text-zinc-900",
                                            children: "登録済みデッキ"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                            lineNumber: 786,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-zinc-700",
                                            children: [
                                                sortedDecks.length,
                                                "件"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                            lineNumber: 789,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/MatchupManager.tsx",
                                    lineNumber: 785,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 space-y-3",
                                    children: [
                                        sortedDecks.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-zinc-700",
                                            children: "まだ登録がありません。"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MatchupManager.tsx",
                                            lineNumber: 795,
                                            columnNumber: 19
                                        }, this),
                                        sortedDecks.map((deck)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-semibold text-zinc-900",
                                                                children: deck.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/MatchupManager.tsx",
                                                                lineNumber: 803,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-zinc-700",
                                                                children: [
                                                                    deckClassLabels[deck.deckClass] ?? deck.deckClass,
                                                                    " /",
                                                                    " ",
                                                                    deck.cardPack.name
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/components/MatchupManager.tsx",
                                                                lineNumber: 806,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/MatchupManager.tsx",
                                                        lineNumber: 802,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "text-sm font-semibold text-zinc-700 hover:text-zinc-900",
                                                                onClick: ()=>onDeckEdit(deck),
                                                                type: "button",
                                                                children: "編集"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/MatchupManager.tsx",
                                                                lineNumber: 812,
                                                                columnNumber: 23
                                                            }, this),
                                                            isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "text-sm font-semibold text-red-600 hover:text-red-700",
                                                                onClick: ()=>onDeckDelete(deck.id),
                                                                type: "button",
                                                                children: "削除"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/MatchupManager.tsx",
                                                                lineNumber: 820,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/MatchupManager.tsx",
                                                        lineNumber: 811,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, deck.id, true, {
                                                fileName: "[project]/app/components/MatchupManager.tsx",
                                                lineNumber: 798,
                                                columnNumber: 19
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/MatchupManager.tsx",
                                    lineNumber: 793,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/MatchupManager.tsx",
                            lineNumber: 784,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/MatchupManager.tsx",
                    lineNumber: 442,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/MatchupManager.tsx",
            lineNumber: 425,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/MatchupManager.tsx",
        lineNumber: 424,
        columnNumber: 5
    }, this);
}
_s(MatchupManager, "aF1Zkg+zHiL8hJNZWueG9iBit3U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"]
    ];
});
_c = MatchupManager;
var _c;
__turbopack_context__.k.register(_c, "MatchupManager");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_components_ddd18b98._.js.map