-- Create users table.
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Add userId to existing matchups as nullable first.
ALTER TABLE "Matchup" ADD COLUMN "userId" INTEGER;

-- Seed a default user and backfill existing matchups.
INSERT INTO "User" ("name") VALUES ('torieru');

UPDATE "Matchup"
SET "userId" = (
    SELECT "id" FROM "User" WHERE "name" = 'torieru' ORDER BY "id" LIMIT 1
);

-- Enforce required userId and update constraints.
ALTER TABLE "Matchup" ALTER COLUMN "userId" SET NOT NULL;

ALTER TABLE "Matchup" DROP CONSTRAINT IF EXISTS "Matchup_deck1Id_deck2Id_key";

ALTER TABLE "Matchup" ADD CONSTRAINT "Matchup_deck1Id_deck2Id_userId_key"
UNIQUE ("deck1Id", "deck2Id", "userId");

ALTER TABLE "Matchup" ADD CONSTRAINT "Matchup_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
