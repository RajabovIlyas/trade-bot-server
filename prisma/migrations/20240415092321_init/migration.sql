-- CreateEnum
CREATE TYPE "TradeAction" AS ENUM ('buy', 'cell', 'wait');

-- CreateTable
CREATE TABLE "Buyer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "wallet" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Buyer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalcTrade" (
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

    CONSTRAINT "CalcTrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryBuy" (
    "id" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "cryptocurrencyId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "count" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HistoryBuy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cryptocurrency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cryptocurrency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cryptocurrency_symbol_key" ON "Cryptocurrency"("symbol");

-- AddForeignKey
ALTER TABLE "HistoryBuy" ADD CONSTRAINT "HistoryBuy_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryBuy" ADD CONSTRAINT "HistoryBuy_cryptocurrencyId_fkey" FOREIGN KEY ("cryptocurrencyId") REFERENCES "Cryptocurrency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
