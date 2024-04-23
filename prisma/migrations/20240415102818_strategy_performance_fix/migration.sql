/*
  Warnings:

  - Changed the type of `CCI` on the `StrategyPerformance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "StrategyPerformance" DROP COLUMN "CCI",
ADD COLUMN     "CCI" "TradeAction" NOT NULL;
