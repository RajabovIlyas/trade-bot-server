/*
  Warnings:

  - You are about to drop the column `buyerId` on the `HistoryBuy` table. All the data in the column will be lost.
  - You are about to drop the column `cryptocurrencyId` on the `HistoryBuy` table. All the data in the column will be lost.
  - You are about to drop the `Buyer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `walletId` to the `HistoryBuy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HistoryBuy" DROP CONSTRAINT "HistoryBuy_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "HistoryBuy" DROP CONSTRAINT "HistoryBuy_cryptocurrencyId_fkey";

-- AlterTable
ALTER TABLE "HistoryBuy" DROP COLUMN "buyerId",
DROP COLUMN "cryptocurrencyId",
ADD COLUMN     "walletId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Buyer";

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "usd" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "cryptocurrency" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "strategy" "StrategyAction" NOT NULL,
    "cryptocurrencyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_cryptocurrencyId_fkey" FOREIGN KEY ("cryptocurrencyId") REFERENCES "Cryptocurrency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryBuy" ADD CONSTRAINT "HistoryBuy_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
