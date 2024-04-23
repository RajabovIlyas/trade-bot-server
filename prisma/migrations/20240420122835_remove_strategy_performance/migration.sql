/*
  Warnings:

  - You are about to drop the `StrategyPerformance` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `HistoryBuy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `HistoryBuy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HistoryBuy" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "TradeAction" NOT NULL;

-- DropTable
DROP TABLE "StrategyPerformance";
