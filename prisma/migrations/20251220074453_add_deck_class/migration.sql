/*
  Warnings:

  - Added the required column `deckClass` to the `Deck` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DeckClass" AS ENUM ('ELF', 'ROYAL', 'WITCH', 'NIGHTMARE', 'DRAGON', 'BISHOP', 'NEMESIS');

-- AlterTable
ALTER TABLE "Deck" ADD COLUMN     "deckClass" "DeckClass" NOT NULL;
