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
    const formatRate = (value)=>Number.isInteger(value) ? value.toString() : value.toFixed(1);
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StatsTable.useMemo[stats]": ()=>buildAverageStats(decks, matchups)
    }["StatsTable.useMemo[stats]"], [
        decks,
        matchups
    ]);
    const overallMatrix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StatsTable.useMemo[overallMatrix]": ()=>buildMatchupMatrix(decks, matchups)
    }["StatsTable.useMemo[overallMatrix]"], [
        decks,
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
        "StatsTable.useMemo[activeMatrix]": ()=>buildMatchupMatrix(decks, activeMatchups)
    }["StatsTable.useMemo[activeMatrix]"], [
        decks,
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
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mt-2 text-2xl font-semibold text-zinc-900",
                        children: "統計表示"
                    }, void 0, false, {
                        fileName: "[project]/app/components/StatsTable.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/StatsTable.tsx",
                lineNumber: 150,
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
                                            className: "w-44 border border-zinc-300 bg-white px-3 py-2 text-left text-zinc-500",
                                            children: "デッキ"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/StatsTable.tsx",
                                            lineNumber: 163,
                                            columnNumber: 15
                                        }, this),
                                        decks.map((deck)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "min-w-[110px] border border-zinc-300 bg-white px-2 py-2 text-xs text-zinc-500",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-semibold text-zinc-900",
                                                        children: deck.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 171,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] text-zinc-400",
                                                        children: deckClassLabels[deck.deckClass] ?? deck.deckClass
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 172,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, deck.id, true, {
                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                lineNumber: 167,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/StatsTable.tsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/StatsTable.tsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: decks.map((rowDeck, rowIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border border-zinc-300 bg-white px-3 py-3 text-left text-sm font-semibold text-zinc-900",
                                                children: [
                                                    rowDeck.name,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs font-normal text-zinc-500",
                                                        children: [
                                                            deckClassLabels[rowDeck.deckClass] ?? rowDeck.deckClass,
                                                            " / ",
                                                            rowDeck.cardPack.name
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 184,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                lineNumber: 182,
                                                columnNumber: 17
                                            }, this),
                                            decks.map((colDeck, colIndex)=>{
                                                const value = overallMatrix[rowIndex]?.[colIndex];
                                                const isSame = rowDeck.id === colDeck.id;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "border border-zinc-300 px-2 py-3 text-sm",
                                                    children: isSame ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-base font-semibold text-zinc-400",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 199,
                                                        columnNumber: 25
                                                    }, this) : value === undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-zinc-400",
                                                        children: "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 203,
                                                        columnNumber: 25
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-zinc-900",
                                                        children: formatRate(value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 205,
                                                        columnNumber: 25
                                                    }, this)
                                                }, colDeck.id, false, {
                                                    fileName: "[project]/app/components/StatsTable.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        ]
                                    }, rowDeck.id, true, {
                                        fileName: "[project]/app/components/StatsTable.tsx",
                                        lineNumber: 181,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/StatsTable.tsx",
                                lineNumber: 179,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/StatsTable.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this),
                    stats.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-sm text-zinc-500",
                        children: "デッキが登録されていません。"
                    }, void 0, false, {
                        fileName: "[project]/app/components/StatsTable.tsx",
                        lineNumber: 217,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/StatsTable.tsx",
                lineNumber: 159,
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
                                lineNumber: 225,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: users.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: `rounded-full border px-4 py-2 text-xs font-semibold transition ${activeTab === user.id ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 text-zinc-600 hover:bg-zinc-100"}`,
                                        onClick: ()=>setActiveTab(user.id),
                                        children: user.name
                                    }, user.id, false, {
                                        fileName: "[project]/app/components/StatsTable.tsx",
                                        lineNumber: 230,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/StatsTable.tsx",
                                lineNumber: 228,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/StatsTable.tsx",
                        lineNumber: 224,
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
                                                    className: "w-44 border border-zinc-300 bg-white px-3 py-2 text-left text-zinc-500",
                                                    children: "デッキ"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/StatsTable.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 17
                                                }, this),
                                                decks.map((deck)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "min-w-[110px] border border-zinc-300 bg-white px-2 py-2 text-xs text-zinc-500",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-semibold text-zinc-900",
                                                                children: deck.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                                lineNumber: 258,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-[10px] text-zinc-400",
                                                                children: deckClassLabels[deck.deckClass] ?? deck.deckClass
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                                lineNumber: 259,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, deck.id, true, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/StatsTable.tsx",
                                            lineNumber: 249,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/StatsTable.tsx",
                                        lineNumber: 248,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: decks.map((rowDeck, rowIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "border border-zinc-300 bg-white px-3 py-3 text-left text-sm font-semibold text-zinc-900",
                                                        children: [
                                                            rowDeck.name,
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs font-normal text-zinc-500",
                                                                children: [
                                                                    deckClassLabels[rowDeck.deckClass] ?? rowDeck.deckClass,
                                                                    " / ",
                                                                    rowDeck.cardPack.name
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                                lineNumber: 271,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 269,
                                                        columnNumber: 19
                                                    }, this),
                                                    decks.map((colDeck, colIndex)=>{
                                                        const value = activeMatrix[rowIndex]?.[colIndex];
                                                        const isSame = rowDeck.id === colDeck.id;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "border border-zinc-300 px-2 py-3 text-sm",
                                                            children: isSame ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-base font-semibold text-zinc-400",
                                                                children: "*"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                                lineNumber: 286,
                                                                columnNumber: 27
                                                            }, this) : value === undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-zinc-400",
                                                                children: "—"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                                lineNumber: 290,
                                                                columnNumber: 27
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-zinc-900",
                                                                children: formatRate(value)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                                lineNumber: 292,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, colDeck.id, false, {
                                                            fileName: "[project]/app/components/StatsTable.tsx",
                                                            lineNumber: 281,
                                                            columnNumber: 23
                                                        }, this);
                                                    })
                                                ]
                                            }, rowDeck.id, true, {
                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                lineNumber: 268,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/StatsTable.tsx",
                                        lineNumber: 266,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/StatsTable.tsx",
                                lineNumber: 247,
                                columnNumber: 11
                            }, this),
                            users.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-sm text-zinc-500",
                                children: "相性評価が登録されていません。"
                            }, void 0, false, {
                                fileName: "[project]/app/components/StatsTable.tsx",
                                lineNumber: 304,
                                columnNumber: 13
                            }, this),
                            activeTab && activeMatchups.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-sm text-zinc-500",
                                children: "選択したメンバーの相性評価がありません。"
                            }, void 0, false, {
                                fileName: "[project]/app/components/StatsTable.tsx",
                                lineNumber: 309,
                                columnNumber: 13
                            }, this),
                            !activeTab && users.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-sm text-zinc-500",
                                children: "メンバーを選択してください。"
                            }, void 0, false, {
                                fileName: "[project]/app/components/StatsTable.tsx",
                                lineNumber: 314,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/StatsTable.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/StatsTable.tsx",
                lineNumber: 223,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/StatsTable.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
_s(StatsTable, "189GkBhHH61bHXT39WResZs9aLs=");
_c = StatsTable;
var _c;
__turbopack_context__.k.register(_c, "StatsTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/HomeDashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomeDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$StatsTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/StatsTable.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
const formatRate = (value)=>value === null ? "-" : Number.isInteger(value) ? `${value}` : value.toFixed(1);
const buildDeckStats = (decks, records)=>{
    const byDeck = new Map();
    for (const deck of decks){
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
            secondWins: 0
        });
    }
    for (const record of records){
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
    return Array.from(byDeck.values()).filter((stat)=>stat.total > 0).sort((a, b)=>b.total - a.total);
};
function HomeDashboard({ decks, cardPacks, matchups, records }) {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("records");
    const [activePackId, setActivePackId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeDashboard.useEffect": ()=>{
            if (activePackId !== null || cardPacks.length === 0) return;
            setActivePackId(cardPacks[0].id);
        }
    }["HomeDashboard.useEffect"], [
        activePackId,
        cardPacks
    ]);
    const filteredDecks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeDashboard.useMemo[filteredDecks]": ()=>{
            if (!activePackId) return [];
            return decks.filter({
                "HomeDashboard.useMemo[filteredDecks]": (deck)=>deck.cardPack.id === activePackId
            }["HomeDashboard.useMemo[filteredDecks]"]);
        }
    }["HomeDashboard.useMemo[filteredDecks]"], [
        activePackId,
        decks
    ]);
    const filteredMatchups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeDashboard.useMemo[filteredMatchups]": ()=>{
            if (!activePackId) return [];
            return matchups.filter({
                "HomeDashboard.useMemo[filteredMatchups]": (matchup)=>matchup.deck1.cardPack.id === activePackId && matchup.deck2.cardPack.id === activePackId
            }["HomeDashboard.useMemo[filteredMatchups]"]);
        }
    }["HomeDashboard.useMemo[filteredMatchups]"], [
        activePackId,
        matchups
    ]);
    const filteredRecords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeDashboard.useMemo[filteredRecords]": ()=>{
            if (!activePackId) return [];
            return records.filter({
                "HomeDashboard.useMemo[filteredRecords]": (record)=>record.deck.cardPack.id === activePackId
            }["HomeDashboard.useMemo[filteredRecords]"]);
        }
    }["HomeDashboard.useMemo[filteredRecords]"], [
        activePackId,
        records
    ]);
    const summary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeDashboard.useMemo[summary]": ()=>{
            const total = filteredRecords.length;
            const wins = filteredRecords.filter({
                "HomeDashboard.useMemo[summary]": (record)=>record.result === "WIN"
            }["HomeDashboard.useMemo[summary]"]).length;
            const firstTotal = filteredRecords.filter({
                "HomeDashboard.useMemo[summary]": (record)=>record.turn === "FIRST"
            }["HomeDashboard.useMemo[summary]"]).length;
            const firstWins = filteredRecords.filter({
                "HomeDashboard.useMemo[summary]": (record)=>record.turn === "FIRST" && record.result === "WIN"
            }["HomeDashboard.useMemo[summary]"]).length;
            const secondTotal = filteredRecords.filter({
                "HomeDashboard.useMemo[summary]": (record)=>record.turn === "SECOND"
            }["HomeDashboard.useMemo[summary]"]).length;
            const secondWins = filteredRecords.filter({
                "HomeDashboard.useMemo[summary]": (record)=>record.turn === "SECOND" && record.result === "WIN"
            }["HomeDashboard.useMemo[summary]"]).length;
            return {
                total,
                wins,
                rate: total ? wins / total * 100 : null,
                firstRate: firstTotal ? firstWins / firstTotal * 100 : null,
                secondRate: secondTotal ? secondWins / secondTotal * 100 : null,
                firstTotal,
                secondTotal
            };
        }
    }["HomeDashboard.useMemo[summary]"], [
        filteredRecords
    ]);
    const deckStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeDashboard.useMemo[deckStats]": ()=>buildDeckStats(filteredDecks, filteredRecords)
    }["HomeDashboard.useMemo[deckStats]"], [
        filteredDecks,
        filteredRecords
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "rounded-2xl bg-transparent",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-2 px-4 pt-3",
                    children: cardPacks.map((pack)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: `relative -mb-px rounded-t-xl border border-b-0 px-5 py-2 text-xs font-semibold transition ${activePackId === pack.id ? "border-zinc-900 bg-white text-zinc-900" : "border-zinc-200 bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`,
                            onClick: ()=>setActivePackId(pack.id),
                            children: pack.name
                        }, pack.id, false, {
                            fileName: "[project]/app/components/HomeDashboard.tsx",
                            lineNumber: 175,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/components/HomeDashboard.tsx",
                    lineNumber: 173,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "-mt-px rounded-t-2xl rounded-b-2xl border-x border-b border-zinc-200 bg-white p-6 shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400",
                                    children: "Home"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/HomeDashboard.tsx",
                                    lineNumber: 191,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mt-2 text-2xl font-semibold text-zinc-900",
                                    children: "HOME"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/HomeDashboard.tsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/HomeDashboard.tsx",
                            lineNumber: 190,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 flex flex-wrap gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: `rounded-full border px-4 py-2 text-xs font-semibold transition ${activeTab === "records" ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 text-zinc-600 hover:bg-zinc-100"}`,
                                    onClick: ()=>setActiveTab("records"),
                                    children: "戦績"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/HomeDashboard.tsx",
                                    lineNumber: 197,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: `rounded-full border px-4 py-2 text-xs font-semibold transition ${activeTab === "matchups" ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 text-zinc-600 hover:bg-zinc-100"}`,
                                    onClick: ()=>setActiveTab("matchups"),
                                    children: "相性"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/HomeDashboard.tsx",
                                    lineNumber: 208,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/HomeDashboard.tsx",
                            lineNumber: 196,
                            columnNumber: 11
                        }, this),
                        activeTab === "records" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 border-t border-zinc-100 pt-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400",
                                            children: "Records"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/HomeDashboard.tsx",
                                            lineNumber: 223,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "mt-2 text-lg font-semibold text-zinc-900",
                                            children: "戦績サマリー"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/HomeDashboard.tsx",
                                            lineNumber: 226,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/HomeDashboard.tsx",
                                    lineNumber: 222,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 grid gap-4 md:grid-cols-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-zinc-500",
                                                    children: "全体勝率"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/HomeDashboard.tsx",
                                                    lineNumber: 233,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-2xl font-semibold text-zinc-900",
                                                    children: [
                                                        formatRate(summary.rate),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "ml-2 text-sm text-zinc-500",
                                                            children: [
                                                                summary.wins,
                                                                "/",
                                                                summary.total
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/HomeDashboard.tsx",
                                                            lineNumber: 236,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/HomeDashboard.tsx",
                                                    lineNumber: 234,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/HomeDashboard.tsx",
                                            lineNumber: 232,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-zinc-500",
                                                    children: "先攻勝率"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/HomeDashboard.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-2xl font-semibold text-zinc-900",
                                                    children: [
                                                        formatRate(summary.firstRate),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "ml-2 text-sm text-zinc-500",
                                                            children: summary.firstTotal
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/HomeDashboard.tsx",
                                                            lineNumber: 245,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/HomeDashboard.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/HomeDashboard.tsx",
                                            lineNumber: 241,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-zinc-500",
                                                    children: "後攻勝率"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/HomeDashboard.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-2xl font-semibold text-zinc-900",
                                                    children: [
                                                        formatRate(summary.secondRate),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "ml-2 text-sm text-zinc-500",
                                                            children: summary.secondTotal
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/HomeDashboard.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/HomeDashboard.tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/HomeDashboard.tsx",
                                            lineNumber: 250,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/HomeDashboard.tsx",
                                    lineNumber: 231,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 overflow-x-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "min-w-full text-left text-sm text-zinc-700",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    className: "border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wider text-zinc-400",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-3 py-2",
                                                                children: "デッキ"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/HomeDashboard.tsx",
                                                                lineNumber: 265,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-3 py-2 text-center",
                                                                children: "全体勝率"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/HomeDashboard.tsx",
                                                                lineNumber: 266,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-3 py-2 text-center",
                                                                children: "先攻勝率"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/HomeDashboard.tsx",
                                                                lineNumber: 267,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-3 py-2 text-center",
                                                                children: "後攻勝率"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/HomeDashboard.tsx",
                                                                lineNumber: 268,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-3 py-2 text-center",
                                                                children: "試合数"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/HomeDashboard.tsx",
                                                                lineNumber: 269,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/HomeDashboard.tsx",
                                                        lineNumber: 264,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/HomeDashboard.tsx",
                                                    lineNumber: 263,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    children: deckStats.map((stat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: "border-b border-zinc-100",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-3 py-3 font-semibold text-zinc-900",
                                                                    children: [
                                                                        stat.name,
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-xs font-normal text-zinc-500",
                                                                            children: [
                                                                                deckClassLabels[stat.deckClass] ?? stat.deckClass,
                                                                                " / ",
                                                                                stat.cardPack
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/components/HomeDashboard.tsx",
                                                                            lineNumber: 277,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/components/HomeDashboard.tsx",
                                                                    lineNumber: 275,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-3 py-3 text-center font-semibold text-zinc-900",
                                                                    children: formatRate(stat.total ? stat.wins / stat.total * 100 : null)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/HomeDashboard.tsx",
                                                                    lineNumber: 283,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-3 py-3 text-center",
                                                                    children: formatRate(stat.firstTotal ? stat.firstWins / stat.firstTotal * 100 : null)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/HomeDashboard.tsx",
                                                                    lineNumber: 288,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-3 py-3 text-center",
                                                                    children: formatRate(stat.secondTotal ? stat.secondWins / stat.secondTotal * 100 : null)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/HomeDashboard.tsx",
                                                                    lineNumber: 295,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-3 py-3 text-center",
                                                                    children: stat.total
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/HomeDashboard.tsx",
                                                                    lineNumber: 302,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, stat.deckId, true, {
                                                            fileName: "[project]/app/components/HomeDashboard.tsx",
                                                            lineNumber: 274,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/HomeDashboard.tsx",
                                                    lineNumber: 272,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/HomeDashboard.tsx",
                                            lineNumber: 262,
                                            columnNumber: 17
                                        }, this),
                                        deckStats.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-4 text-sm text-zinc-500",
                                            children: "戦績が登録されていません。"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/HomeDashboard.tsx",
                                            lineNumber: 308,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/HomeDashboard.tsx",
                                    lineNumber: 261,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/HomeDashboard.tsx",
                            lineNumber: 221,
                            columnNumber: 13
                        }, this),
                        activeTab === "matchups" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 border-t border-zinc-100 pt-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$StatsTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                decks: filteredDecks,
                                matchups: filteredMatchups,
                                embedded: true
                            }, void 0, false, {
                                fileName: "[project]/app/components/HomeDashboard.tsx",
                                lineNumber: 318,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/HomeDashboard.tsx",
                            lineNumber: 317,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/HomeDashboard.tsx",
                    lineNumber: 189,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/HomeDashboard.tsx",
            lineNumber: 172,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/HomeDashboard.tsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
}
_s(HomeDashboard, "2Ro+Y4eMD1iYFMDd81xV2dBxf7o=");
_c = HomeDashboard;
var _c;
__turbopack_context__.k.register(_c, "HomeDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_components_f3ee9bc9._.js.map