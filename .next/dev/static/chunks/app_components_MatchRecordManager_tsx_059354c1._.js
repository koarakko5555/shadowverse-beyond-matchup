(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/MatchRecordManager.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MatchRecordManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
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
const turnLabels = {
    FIRST: "先攻",
    SECOND: "後攻"
};
const resultLabels = {
    WIN: "勝ち",
    LOSS: "負け"
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
function MatchRecordManager({ decks, records }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    const [deckId, setDeckId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [opponentDeckId, setOpponentDeckId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [turn, setTurn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("FIRST");
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("WIN");
    const [note, setNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("overall");
    const users = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchRecordManager.useMemo[users]": ()=>{
            const seen = new Map();
            for (const record of records){
                if (!seen.has(record.user.id)) {
                    seen.set(record.user.id, record.user.name);
                }
            }
            return Array.from(seen.entries()).map({
                "MatchRecordManager.useMemo[users]": ([id, name])=>({
                        id,
                        name
                    })
            }["MatchRecordManager.useMemo[users]"]);
        }
    }["MatchRecordManager.useMemo[users]"], [
        records
    ]);
    const selectedDeck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchRecordManager.useMemo[selectedDeck]": ()=>decks.find({
                "MatchRecordManager.useMemo[selectedDeck]": (deck)=>deck.id === Number(deckId)
            }["MatchRecordManager.useMemo[selectedDeck]"])
    }["MatchRecordManager.useMemo[selectedDeck]"], [
        deckId,
        decks
    ]);
    const opponentOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchRecordManager.useMemo[opponentOptions]": ()=>{
            if (!selectedDeck) return decks;
            return decks.filter({
                "MatchRecordManager.useMemo[opponentOptions]": (deck)=>deck.cardPack.id === selectedDeck.cardPack.id
            }["MatchRecordManager.useMemo[opponentOptions]"]);
        }
    }["MatchRecordManager.useMemo[opponentOptions]"], [
        decks,
        selectedDeck
    ]);
    const deckOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchRecordManager.useMemo[deckOptions]": ()=>decks.map({
                "MatchRecordManager.useMemo[deckOptions]": (deck)=>({
                        id: deck.id,
                        label: `${deck.name} (${deckClassLabels[deck.deckClass] ?? deck.deckClass})`,
                        cardPack: deck.cardPack.name,
                        cardPackId: deck.cardPack.id
                    })
            }["MatchRecordManager.useMemo[deckOptions]"])
    }["MatchRecordManager.useMemo[deckOptions]"], [
        decks
    ]);
    const activeRecords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchRecordManager.useMemo[activeRecords]": ()=>{
            if (activeTab === "overall") return records;
            return records.filter({
                "MatchRecordManager.useMemo[activeRecords]": (record)=>record.user.id === activeTab
            }["MatchRecordManager.useMemo[activeRecords]"]);
        }
    }["MatchRecordManager.useMemo[activeRecords]"], [
        activeTab,
        records
    ]);
    const summary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchRecordManager.useMemo[summary]": ()=>{
            const total = activeRecords.length;
            const wins = activeRecords.filter({
                "MatchRecordManager.useMemo[summary]": (record)=>record.result === "WIN"
            }["MatchRecordManager.useMemo[summary]"]).length;
            const firstTotal = activeRecords.filter({
                "MatchRecordManager.useMemo[summary]": (record)=>record.turn === "FIRST"
            }["MatchRecordManager.useMemo[summary]"]).length;
            const firstWins = activeRecords.filter({
                "MatchRecordManager.useMemo[summary]": (record)=>record.turn === "FIRST" && record.result === "WIN"
            }["MatchRecordManager.useMemo[summary]"]).length;
            const secondTotal = activeRecords.filter({
                "MatchRecordManager.useMemo[summary]": (record)=>record.turn === "SECOND"
            }["MatchRecordManager.useMemo[summary]"]).length;
            const secondWins = activeRecords.filter({
                "MatchRecordManager.useMemo[summary]": (record)=>record.turn === "SECOND" && record.result === "WIN"
            }["MatchRecordManager.useMemo[summary]"]).length;
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
    }["MatchRecordManager.useMemo[summary]"], [
        activeRecords
    ]);
    const deckStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatchRecordManager.useMemo[deckStats]": ()=>buildDeckStats(decks, activeRecords)
    }["MatchRecordManager.useMemo[deckStats]"], [
        decks,
        activeRecords
    ]);
    const onSubmit = async (event)=>{
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
            note
        };
        const targetUrl = editingId ? `/api/match-records/${editingId}` : "/api/match-records";
        const method = editingId ? "PUT" : "POST";
        const res = await fetch(targetUrl, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        if (!res.ok) {
            const data = await res.json().catch(()=>({}));
            setError(data?.error ?? "登録に失敗しました。");
            return;
        }
        setDeckId("");
        setOpponentDeckId("");
        setTurn("FIRST");
        setResult("WIN");
        setNote("");
        setEditingId(null);
        startTransition(()=>router.refresh());
    };
    const onEdit = (record)=>{
        setDeckId(String(record.deck.id));
        setOpponentDeckId(String(record.opponentDeck.id));
        setTurn(record.turn);
        setResult(record.result);
        setNote(record.note ?? "");
        setEditingId(record.id);
    };
    const onCancelEdit = ()=>{
        setDeckId("");
        setOpponentDeckId("");
        setTurn("FIRST");
        setResult("WIN");
        setNote("");
        setEditingId(null);
        setError(null);
    };
    const onDelete = async (id)=>{
        setError(null);
        const res = await fetch(`/api/match-records/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) {
            const data = await res.json().catch(()=>({}));
            setError(data?.error ?? "削除に失敗しました。");
            return;
        }
        startTransition(()=>router.refresh());
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400",
                                children: "Records"
                            }, void 0, false, {
                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                lineNumber: 273,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-2 text-2xl font-semibold text-zinc-900",
                                children: editingId ? "戦績の編集" : "戦績の登録"
                            }, void 0, false, {
                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                lineNumber: 276,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                        lineNumber: 272,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        className: "mt-6 grid gap-4 md:grid-cols-4",
                        onSubmit: onSubmit,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex flex-col gap-2 text-sm text-zinc-700 md:col-span-2",
                                children: [
                                    "自分のデッキ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none",
                                        value: deckId,
                                        onChange: (event)=>{
                                            setDeckId(event.target.value);
                                            setOpponentDeckId("");
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "選択してください"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                lineNumber: 292,
                                                columnNumber: 15
                                            }, this),
                                            deckOptions.map((deck)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: deck.id,
                                                    children: [
                                                        deck.label,
                                                        " / ",
                                                        deck.cardPack
                                                    ]
                                                }, deck.id, true, {
                                                    fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                                        lineNumber: 284,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                lineNumber: 282,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex flex-col gap-2 text-sm text-zinc-700 md:col-span-2",
                                children: [
                                    "対戦デッキ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none",
                                        value: opponentDeckId,
                                        onChange: (event)=>setOpponentDeckId(event.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "選択してください"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                lineNumber: 307,
                                                columnNumber: 15
                                            }, this),
                                            opponentOptions.map((deck)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: deck.id,
                                                    children: [
                                                        deck.name,
                                                        " / ",
                                                        deck.cardPack.name
                                                    ]
                                                }, deck.id, true, {
                                                    fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                    lineNumber: 309,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                                        lineNumber: 302,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                lineNumber: 300,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex flex-col gap-2 text-sm text-zinc-700",
                                children: [
                                    "先攻/後攻",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none",
                                        value: turn,
                                        onChange: (event)=>setTurn(event.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "FIRST",
                                                children: "先攻"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                lineNumber: 324,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "SECOND",
                                                children: "後攻"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                lineNumber: 325,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                                        lineNumber: 317,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                lineNumber: 315,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex flex-col gap-2 text-sm text-zinc-700",
                                children: [
                                    "勝敗",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none",
                                        value: result,
                                        onChange: (event)=>setResult(event.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "WIN",
                                                children: "勝ち"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                lineNumber: 337,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "LOSS",
                                                children: "負け"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                lineNumber: 338,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                                        lineNumber: 330,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                lineNumber: 328,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex flex-col gap-2 text-sm text-zinc-700 md:col-span-4",
                                children: [
                                    "備考",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        className: "min-h-[110px] rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none",
                                        value: note,
                                        onChange: (event)=>setNote(event.target.value),
                                        placeholder: "任意でメモを入力してください"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                                        lineNumber: 343,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                lineNumber: 341,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-3 md:col-span-4 md:flex-row md:items-end md:justify-start",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400 md:w-auto md:min-w-[160px]",
                                        type: "submit",
                                        disabled: isPending,
                                        children: editingId ? "更新する" : "登録する"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                                        lineNumber: 351,
                                        columnNumber: 13
                                    }, this),
                                    editingId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "w-full rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 md:w-auto md:min-w-[160px]",
                                        type: "button",
                                        onClick: onCancelEdit,
                                        children: "編集をやめる"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                                        lineNumber: 359,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                lineNumber: 350,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                        lineNumber: 281,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 text-sm text-red-600",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                        lineNumber: 369,
                        columnNumber: 19
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/MatchRecordManager.tsx",
                lineNumber: 271,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400",
                                children: "Summary"
                            }, void 0, false, {
                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                lineNumber: 374,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "mt-2 text-lg font-semibold text-zinc-900",
                                children: "勝率サマリー"
                            }, void 0, false, {
                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                lineNumber: 377,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                        lineNumber: 373,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: `rounded-full border px-4 py-2 text-xs font-semibold transition ${activeTab === "overall" ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 text-zinc-600 hover:bg-zinc-100"}`,
                                onClick: ()=>setActiveTab("overall"),
                                children: "全体"
                            }, void 0, false, {
                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                lineNumber: 383,
                                columnNumber: 11
                            }, this),
                            users.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: `rounded-full border px-4 py-2 text-xs font-semibold transition ${activeTab === user.id ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 text-zinc-600 hover:bg-zinc-100"}`,
                                    onClick: ()=>setActiveTab(user.id),
                                    children: user.name
                                }, user.id, false, {
                                    fileName: "[project]/app/components/MatchRecordManager.tsx",
                                    lineNumber: 395,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                        lineNumber: 382,
                        columnNumber: 9
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
                                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                                        lineNumber: 412,
                                        columnNumber: 13
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
                                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                lineNumber: 415,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                                        lineNumber: 413,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                lineNumber: 411,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-zinc-500",
                                        children: "先攻勝率"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                                        lineNumber: 421,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-2xl font-semibold text-zinc-900",
                                        children: [
                                            formatRate(summary.firstRate),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-2 text-sm text-zinc-500",
                                                children: summary.firstTotal
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                lineNumber: 424,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                                        lineNumber: 422,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                lineNumber: 420,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-zinc-500",
                                        children: "後攻勝率"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                                        lineNumber: 430,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-2xl font-semibold text-zinc-900",
                                        children: [
                                            formatRate(summary.secondRate),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-2 text-sm text-zinc-500",
                                                children: summary.secondTotal
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                lineNumber: 433,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                                        lineNumber: 431,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                lineNumber: 429,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                        lineNumber: 410,
                        columnNumber: 9
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
                                                    fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                    lineNumber: 444,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-3 py-2 text-center",
                                                    children: "全体勝率"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                    lineNumber: 445,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-3 py-2 text-center",
                                                    children: "先攻勝率"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                    lineNumber: 446,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-3 py-2 text-center",
                                                    children: "後攻勝率"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                    lineNumber: 447,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-3 py-2 text-center",
                                                    children: "試合数"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                    lineNumber: 448,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/MatchRecordManager.tsx",
                                            lineNumber: 443,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                                        lineNumber: 442,
                                        columnNumber: 13
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
                                                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                                lineNumber: 456,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                        lineNumber: 454,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-3 py-3 text-center font-semibold text-zinc-900",
                                                        children: formatRate(stat.total ? stat.wins / stat.total * 100 : null)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                        lineNumber: 462,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-3 py-3 text-center",
                                                        children: formatRate(stat.firstTotal ? stat.firstWins / stat.firstTotal * 100 : null)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                        lineNumber: 465,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-3 py-3 text-center",
                                                        children: formatRate(stat.secondTotal ? stat.secondWins / stat.secondTotal * 100 : null)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                        lineNumber: 472,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-3 py-3 text-center",
                                                        children: stat.total
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                        lineNumber: 479,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, stat.deckId, true, {
                                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                lineNumber: 453,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                                        lineNumber: 451,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                lineNumber: 441,
                                columnNumber: 11
                            }, this),
                            deckStats.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-sm text-zinc-500",
                                children: "戦績が登録されていません。"
                            }, void 0, false, {
                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                lineNumber: 485,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                        lineNumber: 440,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/MatchRecordManager.tsx",
                lineNumber: 372,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold text-zinc-900",
                                children: "戦績一覧"
                            }, void 0, false, {
                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                lineNumber: 494,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-zinc-500",
                                children: [
                                    records.length,
                                    "件"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                lineNumber: 495,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                        lineNumber: 493,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 space-y-3",
                        children: [
                            records.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-zinc-500",
                                children: "まだ登録がありません。"
                            }, void 0, false, {
                                fileName: "[project]/app/components/MatchRecordManager.tsx",
                                lineNumber: 499,
                                columnNumber: 13
                            }, this),
                            records.map((record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-semibold text-zinc-900",
                                                    children: [
                                                        record.deck.name,
                                                        " vs ",
                                                        record.opponentDeck.name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                    lineNumber: 507,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-zinc-500",
                                                    children: [
                                                        "登録: ",
                                                        record.user.name,
                                                        " ・",
                                                        turnLabels[record.turn],
                                                        " ・",
                                                        resultLabels[record.result]
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                    lineNumber: 510,
                                                    columnNumber: 17
                                                }, this),
                                                record.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-xs text-zinc-600",
                                                    children: record.note
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                    lineNumber: 515,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/MatchRecordManager.tsx",
                                            lineNumber: 506,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `rounded-full px-3 py-1 text-xs font-semibold ${record.result === "WIN" ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"}`,
                                                    children: resultLabels[record.result]
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                    lineNumber: 519,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "text-sm font-semibold text-zinc-700 hover:text-zinc-900",
                                                    onClick: ()=>onEdit(record),
                                                    type: "button",
                                                    children: "編集"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                    lineNumber: 528,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "text-sm font-semibold text-red-600 hover:text-red-700",
                                                    onClick: ()=>onDelete(record.id),
                                                    type: "button",
                                                    children: "削除"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/MatchRecordManager.tsx",
                                                    lineNumber: 535,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/MatchRecordManager.tsx",
                                            lineNumber: 518,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, record.id, true, {
                                    fileName: "[project]/app/components/MatchRecordManager.tsx",
                                    lineNumber: 502,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/MatchRecordManager.tsx",
                        lineNumber: 497,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/MatchRecordManager.tsx",
                lineNumber: 492,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/MatchRecordManager.tsx",
        lineNumber: 270,
        columnNumber: 5
    }, this);
}
_s(MatchRecordManager, "hEoV0XRgRQiaWRqVV68CrIGjYQs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"]
    ];
});
_c = MatchRecordManager;
var _c;
__turbopack_context__.k.register(_c, "MatchRecordManager");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_components_MatchRecordManager_tsx_059354c1._.js.map