-- WARNING: This migration resets Matchup/User data to align with local auth users.

DROP TABLE IF EXISTS "Matchup";
DROP TABLE IF EXISTS "users";

CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MEMBER');

CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "loginId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'MEMBER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "users_loginId_key" ON "users"("loginId");

CREATE TABLE "Matchup" (
    "id" SERIAL NOT NULL,
    "deck1Id" INTEGER NOT NULL,
    "deck2Id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "winRate" DOUBLE PRECISION NOT NULL,
    CONSTRAINT "Matchup_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Matchup" ADD CONSTRAINT "Matchup_deck1Id_fkey"
FOREIGN KEY ("deck1Id") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Matchup" ADD CONSTRAINT "Matchup_deck2Id_fkey"
FOREIGN KEY ("deck2Id") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Matchup" ADD CONSTRAINT "Matchup_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE UNIQUE INDEX "Matchup_deck1Id_deck2Id_userId_key"
ON "Matchup"("deck1Id", "deck2Id", "userId");
