/*
  Warnings:

  - Added the required column `calculated` to the `HistoryBuy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HistoryBuy" ADD COLUMN     "calculated" DOUBLE PRECISION NOT NULL;
