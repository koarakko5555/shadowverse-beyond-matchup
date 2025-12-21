-- CreateTable
CREATE TABLE "CardPack" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CardPack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cardPackId" INTEGER NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Matchup" (
    "id" SERIAL NOT NULL,
    "deck1Id" INTEGER NOT NULL,
    "deck2Id" INTEGER NOT NULL,
    "winRate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Matchup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_cardPackId_fkey" FOREIGN KEY ("cardPackId") REFERENCES "CardPack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matchup" ADD CONSTRAINT "Matchup_deck1Id_fkey" FOREIGN KEY ("deck1Id") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matchup" ADD CONSTRAINT "Matchup_deck2Id_fkey" FOREIGN KEY ("deck2Id") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
