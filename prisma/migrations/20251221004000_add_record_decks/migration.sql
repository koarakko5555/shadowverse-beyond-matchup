-- Create per-user record decks table
CREATE TABLE "RecordDeck" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "deckClass" "DeckClass" NOT NULL,
  "cardPackId" INTEGER NOT NULL,
  "userId" INTEGER NOT NULL
);

CREATE INDEX "RecordDeck_userId_idx" ON "RecordDeck" ("userId");
CREATE INDEX "RecordDeck_cardPackId_idx" ON "RecordDeck" ("cardPackId");

ALTER TABLE "RecordDeck"
  ADD CONSTRAINT "RecordDeck_cardPackId_fkey"
  FOREIGN KEY ("cardPackId") REFERENCES "CardPack" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "RecordDeck"
  ADD CONSTRAINT "RecordDeck_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Existing match records are based on global decks; clear to avoid FK conflicts
DELETE FROM "MatchRecord";

ALTER TABLE "MatchRecord"
  DROP CONSTRAINT IF EXISTS "MatchRecord_deckId_fkey";
ALTER TABLE "MatchRecord"
  DROP CONSTRAINT IF EXISTS "MatchRecord_opponentDeckId_fkey";

ALTER TABLE "MatchRecord"
  ADD CONSTRAINT "MatchRecord_deckId_fkey"
  FOREIGN KEY ("deckId") REFERENCES "RecordDeck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "MatchRecord"
  ADD CONSTRAINT "MatchRecord_opponentDeckId_fkey"
  FOREIGN KEY ("opponentDeckId") REFERENCES "RecordDeck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
