/*
  Warnings:

  - You are about to drop the column `cryptocurrency` on the `Wallet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "cryptocurrency",
ADD COLUMN     "cryptocurrencyQuantity" DOUBLE PRECISION NOT NULL DEFAULT 0;
