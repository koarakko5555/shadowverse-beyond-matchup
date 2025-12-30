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
const buildMemberStats = (matchups)=>{
    const totals = new Map();
    for (const matchup of matchups){
        const entry = totals.get(matchup.user.id) ?? {
            name: matchup.user.name,
            total: 0,
            count: 0
        };
        entry.total += matchup.winRate;
        entry.count += 1;
        totals.set(matchup.user.id, entry);
    }
    return Array.from(totals.entries()).map(([userId, value])=>({
            userId,
            name: value.name,
            average: value.count ? value.total / value.count : null,
            count: value.count
        }));
};
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
function StatsTable({ decks, matchups }) {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("overall");
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
    const formatRate = (value)=>Number.isInteger(value) ? value.toString() : value.toFixed(1);
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StatsTable.useMemo[stats]": ()=>buildAverageStats(decks, matchups)
    }["StatsTable.useMemo[stats]"], [
        decks,
        matchups
    ]);
    const memberStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StatsTable.useMemo[memberStats]": ()=>buildMemberStats(matchups)
    }["StatsTable.useMemo[memberStats]"], [
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
            if (activeTab === "overall") return matchups;
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
        className: "rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400",
                        children: "Stats"
                    }, void 0, false, {
                        fileName: "[project]/app/components/StatsTable.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mt-2 text-2xl font-semibold text-zinc-900",
                        children: "統計表示"
                    }, void 0, false, {
                        fileName: "[project]/app/components/StatsTable.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/StatsTable.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 flex flex-wrap gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: `rounded-full border px-4 py-2 text-xs font-semibold transition ${activeTab === "overall" ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 text-zinc-600 hover:bg-zinc-100"}`,
                        onClick: ()=>setActiveTab("overall"),
                        children: "統計"
                    }, void 0, false, {
                        fileName: "[project]/app/components/StatsTable.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    users.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: `rounded-full border px-4 py-2 text-xs font-semibold transition ${activeTab === user.id ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 text-zinc-600 hover:bg-zinc-100"}`,
                            onClick: ()=>setActiveTab(user.id),
                            children: user.name
                        }, user.id, false, {
                            fileName: "[project]/app/components/StatsTable.tsx",
                            lineNumber: 183,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/StatsTable.tsx",
                lineNumber: 170,
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
                                            lineNumber: 202,
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
                                                        lineNumber: 210,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] text-zinc-400",
                                                        children: deckClassLabels[deck.deckClass] ?? deck.deckClass
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 211,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, deck.id, true, {
                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                lineNumber: 206,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/StatsTable.tsx",
                                    lineNumber: 201,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/StatsTable.tsx",
                                lineNumber: 200,
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
                                                        lineNumber: 223,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                lineNumber: 221,
                                                columnNumber: 17
                                            }, this),
                                            decks.map((colDeck, colIndex)=>{
                                                const matrix = activeTab === "overall" ? overallMatrix : activeMatrix;
                                                const value = matrix[rowIndex]?.[colIndex];
                                                const isSame = rowDeck.id === colDeck.id;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "border border-zinc-300 px-2 py-3 text-sm",
                                                    children: isSame ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-base font-semibold text-zinc-400",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 240,
                                                        columnNumber: 25
                                                    }, this) : value === undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-zinc-400",
                                                        children: "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 244,
                                                        columnNumber: 25
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-zinc-900",
                                                        children: formatRate(value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 246,
                                                        columnNumber: 25
                                                    }, this)
                                                }, colDeck.id, false, {
                                                    fileName: "[project]/app/components/StatsTable.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        ]
                                    }, rowDeck.id, true, {
                                        fileName: "[project]/app/components/StatsTable.tsx",
                                        lineNumber: 220,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/StatsTable.tsx",
                                lineNumber: 218,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/StatsTable.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this),
                    stats.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-sm text-zinc-500",
                        children: "デッキが登録されていません。"
                    }, void 0, false, {
                        fileName: "[project]/app/components/StatsTable.tsx",
                        lineNumber: 258,
                        columnNumber: 11
                    }, this),
                    activeTab !== "overall" && activeMatchups.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-sm text-zinc-500",
                        children: "選択したメンバーの相性評価がありません。"
                    }, void 0, false, {
                        fileName: "[project]/app/components/StatsTable.tsx",
                        lineNumber: 263,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/StatsTable.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this),
            activeTab === "overall" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-zinc-900",
                        children: "メンバー別の平均相性"
                    }, void 0, false, {
                        fileName: "[project]/app/components/StatsTable.tsx",
                        lineNumber: 271,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 overflow-x-auto",
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
                                                    children: "メンバー"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/StatsTable.tsx",
                                                    lineNumber: 278,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-3 py-2 text-center",
                                                    children: "平均相性"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/StatsTable.tsx",
                                                    lineNumber: 279,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-3 py-2 text-center",
                                                    children: "評価数"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/StatsTable.tsx",
                                                    lineNumber: 280,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/StatsTable.tsx",
                                            lineNumber: 277,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/StatsTable.tsx",
                                        lineNumber: 276,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: memberStats.sort((a, b)=>{
                                            if (a.average === null && b.average === null) return 0;
                                            if (a.average === null) return 1;
                                            if (b.average === null) return -1;
                                            return b.average - a.average;
                                        }).map((stat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "border-b border-zinc-100",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-3 py-3 font-semibold text-zinc-900",
                                                        children: stat.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 293,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-3 py-3 text-center font-semibold text-zinc-900",
                                                        children: stat.average === null ? "-" : stat.average.toFixed(1)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-3 py-3 text-center",
                                                        children: stat.count
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/StatsTable.tsx",
                                                        lineNumber: 299,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, stat.userId, true, {
                                                fileName: "[project]/app/components/StatsTable.tsx",
                                                lineNumber: 292,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/StatsTable.tsx",
                                        lineNumber: 283,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/StatsTable.tsx",
                                lineNumber: 275,
                                columnNumber: 11
                            }, this),
                            memberStats.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-sm text-zinc-500",
                                children: "相性評価が登録されていません。"
                            }, void 0, false, {
                                fileName: "[project]/app/components/StatsTable.tsx",
                                lineNumber: 305,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/StatsTable.tsx",
                        lineNumber: 274,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/StatsTable.tsx",
                lineNumber: 270,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/StatsTable.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, this);
}
_s(StatsTable, "G1cGRpIPakwq2fbMDhAicL8sWxw=");
_c = StatsTable;
var _c;
__turbopack_context__.k.register(_c, "StatsTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_components_StatsTable_tsx_cd63007d._.js.map