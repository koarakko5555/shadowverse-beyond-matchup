import { NextResponse } from "next/server";
import path from "path";
import { readFile } from "fs/promises";

import satori from "satori";
import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";

export const runtime = "nodejs";

let wasmReady = false;

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

const truncateName = (value: string, max = 10) => {
  if (value.length <= max) return value;
  return `${value.slice(0, max)}…`;
};

const buildMatrix = (
  decks: { id: number }[],
  matchups: { deck1Id: number; deck2Id: number; winRate: number }[]
) => {
  const direct = new Map<string, number>();
  for (const matchup of matchups) {
    direct.set(`${matchup.deck1Id}:${matchup.deck2Id}`, matchup.winRate);
  }

  return decks.map((row) =>
    decks.map((col) => {
      if (row.id === col.id) return "*";
      const directValue = direct.get(`${row.id}:${col.id}`);
      if (directValue !== undefined) return Math.round(directValue).toString();
      const reverseValue = direct.get(`${col.id}:${row.id}`);
      if (reverseValue !== undefined) {
        return Math.round(100 - reverseValue).toString();
      }
      return "—";
    })
  );
};

const loadFont = async () => {
  const fontPath = path.join(
    process.cwd(),
    "public",
    "fonts",
    "NotoSansJP-Regular.ttf"
  );
  return readFile(fontPath);
};

export async function POST(request: Request) {
  const { Resvg, initWasm } = await import("@resvg/resvg-wasm");
  if (!wasmReady) {
    const wasmPath = path.join(
      process.cwd(),
      "node_modules",
      "@resvg",
      "resvg-wasm",
      "index_bg.wasm"
    );
    const wasmData = await readFile(wasmPath);
    await initWasm(wasmData);
    wasmReady = true;
  }
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "認証が必要です。" }, { status: 401 });
  }

  const { cardPackId } = await request.json().catch(() => ({}));
  if (!Number.isInteger(cardPackId)) {
    return NextResponse.json(
      { error: "カードパックが不正です。" },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "DiscordのWebhookが未設定です。" },
      { status: 500 }
    );
  }

  const userId = Number(session.sub);
  const [cardPack, decks, matchups, user] = await Promise.all([
    prisma.cardPack.findUnique({ where: { id: cardPackId } }),
    prisma.deck.findMany({
      where: { cardPackId },
      orderBy: { id: "asc" },
    }),
    prisma.matchup.findMany({
      where: {
        userId,
        deck1: { cardPackId },
        deck2: { cardPackId },
      },
      select: {
        deck1Id: true,
        deck2Id: true,
        winRate: true,
      },
    }),
    prisma.user.findUnique({
      where: { id: userId },
      select: { name: true },
    }),
  ]);

  if (!cardPack) {
    return NextResponse.json(
      { error: "カードパックが見つかりません。" },
      { status: 404 }
    );
  }

  const sortedDecks = decks.slice().sort((a, b) => {
    const rankA = deckClassRank.get(a.deckClass) ?? 999;
    const rankB = deckClassRank.get(b.deckClass) ?? 999;
    if (rankA !== rankB) return rankA - rankB;
    return a.id - b.id;
  });

  const matrix = buildMatrix(sortedDecks, matchups);

  const nameColWidth = 120;
  const cellWidth = Math.max(
    60,
    Math.min(110, Math.floor(900 / Math.max(1, sortedDecks.length)))
  );
  const rowHeight = 44;
  const headerHeight = 24;
  const tableWidth = nameColWidth + sortedDecks.length * cellWidth;
  const tableHeight = (sortedDecks.length + 1) * rowHeight;
  const width = tableWidth + 48;
  const height = headerHeight + tableHeight + 24;
  const outputWidth = Math.min(width, 1200);

  const fontData = await loadFont();

  const svg = await satori(
    <div
      style={{
        width,
        height,
        backgroundColor: "#f8fafc",
        padding: 24,
        fontFamily: "Noto Sans JP",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          marginTop: 0,
          borderRadius: 12,
          border: "1px solid #e4e4e7",
          overflow: "hidden",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: "#f4f4f5",
            borderBottom: "1px solid #e4e4e7",
          }}
        >
          <div
            style={{
              width: nameColWidth,
              padding: "10px 12px",
              fontSize: 12,
              fontWeight: 600,
              color: "#374151",
            }}
          >
            デッキ
          </div>
          {sortedDecks.map((deck) => (
            <div
              key={deck.id}
              style={{
                width: cellWidth,
                padding: "10px 6px",
                fontSize: 11,
                fontWeight: 600,
                color: "#111827",
                textAlign: "center",
              }}
            >
              {truncateName(deck.name)}
            </div>
          ))}
        </div>
        {sortedDecks.map((rowDeck, rowIndex) => (
          <div
            key={rowDeck.id}
            style={{
              display: "flex",
              borderBottom:
                rowIndex === sortedDecks.length - 1
                  ? "none"
                  : "1px solid #e4e4e7",
              minHeight: rowHeight,
            }}
          >
            <div
              style={{
                width: nameColWidth,
                padding: "12px",
                fontSize: 12,
                fontWeight: 600,
                color: "#111827",
              }}
            >
              {truncateName(rowDeck.name)}
            </div>
            {sortedDecks.map((colDeck, colIndex) => (
              <div
                key={colDeck.id}
                style={{
                  width: cellWidth,
                  padding: "12px 6px",
                  fontSize: 12,
                  textAlign: "center",
                  color:
                    matrix[rowIndex][colIndex] === "*" ? "#9ca3af" : "#111827",
                }}
              >
                {matrix[rowIndex][colIndex]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>,
    {
      width,
      height,
      fonts: [
        {
          name: "Noto Sans JP",
          data: fontData,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );

  const pngBuffer = new Resvg(svg, {
    fitTo: { mode: "width", value: outputWidth },
  })
    .render()
    .asPng();

  const formData = new FormData();
  const userName = user?.name ?? "ユーザー";
  const headline = `${userName}さんの相性表が更新されました！🦌`;
  formData.append("payload_json", JSON.stringify({ content: headline }));
  formData.append(
    "file",
    new Blob([Buffer.from(pngBuffer)], { type: "image/png" }),
    "matchups.png"
  );

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        {
          error: `Discord投稿に失敗しました。(status: ${response.status}) ${text}`,
        },
        { status: 502 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? `Discord投稿に失敗しました。${err.message}`
            : "Discord投稿に失敗しました。",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
