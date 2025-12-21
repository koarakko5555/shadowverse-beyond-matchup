/*
  Warnings:

  - A unique constraint covering the columns `[deck1Id,deck2Id]` on the table `Matchup` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Matchup_deck1Id_deck2Id_key" ON "Matchup"("deck1Id", "deck2Id");
