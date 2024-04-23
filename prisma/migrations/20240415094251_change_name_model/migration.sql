/*
  Warnings:

  - You are about to drop the `CalcTrade` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CalcTrade";

-- CreateTable
CREATE TABLE "StrategyPerformance" (
    "id" TEXT NOT NULL,
    "CCI" TEXT NOT NULL,
    "RSI" "TradeAction" NOT NULL,
    "STOCH" "TradeAction" NOT NULL,
    "MACD" "TradeAction" NOT NULL,
    "PPO" "TradeAction" NOT NULL,
    "DEMA" "TradeAction" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StrategyPerformance_pkey" PRIMARY KEY ("id")
);
