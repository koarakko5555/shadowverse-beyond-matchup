DO $$
BEGIN
  CREATE TYPE "MatchTurn" AS ENUM ('FIRST', 'SECOND');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END$$;

DO $$
BEGIN
  CREATE TYPE "MatchResult" AS ENUM ('WIN', 'LOSS');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END$$;

CREATE TABLE "MatchRecord" (
    "id" SERIAL NOT NULL,
    "deckId" INTEGER NOT NULL,
    "opponentDeckId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "turn" "MatchTurn" NOT NULL,
    "result" "MatchResult" NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MatchRecord_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "MatchRecord_deckId_idx" ON "MatchRecord"("deckId");
CREATE INDEX "MatchRecord_opponentDeckId_idx" ON "MatchRecord"("opponentDeckId");
CREATE INDEX "MatchRecord_userId_idx" ON "MatchRecord"("userId");

ALTER TABLE "MatchRecord" ADD CONSTRAINT "MatchRecord_deckId_fkey"
FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "MatchRecord" ADD CONSTRAINT "MatchRecord_opponentDeckId_fkey"
FOREIGN KEY ("opponentDeckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "MatchRecord" ADD CONSTRAINT "MatchRecord_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
