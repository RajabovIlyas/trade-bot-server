/*
  Warnings:

  - You are about to drop the column `CCI` on the `StrategyPerformance` table. All the data in the column will be lost.
  - You are about to drop the column `DEMA` on the `StrategyPerformance` table. All the data in the column will be lost.
  - You are about to drop the column `MACD` on the `StrategyPerformance` table. All the data in the column will be lost.
  - You are about to drop the column `PPO` on the `StrategyPerformance` table. All the data in the column will be lost.
  - You are about to drop the column `RSI` on the `StrategyPerformance` table. All the data in the column will be lost.
  - You are about to drop the column `STOCH` on the `StrategyPerformance` table. All the data in the column will be lost.
  - Added the required column `status` to the `StrategyPerformance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `strategy` to the `StrategyPerformance` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StrategyAction" AS ENUM ('CCI', 'RSI', 'STOCH', 'MACD', 'PPO', 'DEMA');

-- AlterTable
ALTER TABLE "StrategyPerformance" DROP COLUMN "CCI",
DROP COLUMN "DEMA",
DROP COLUMN "MACD",
DROP COLUMN "PPO",
DROP COLUMN "RSI",
DROP COLUMN "STOCH",
ADD COLUMN     "status" "TradeAction" NOT NULL,
ADD COLUMN     "strategy" "StrategyAction" NOT NULL;
