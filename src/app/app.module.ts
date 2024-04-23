import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CronModule } from './cron/cron.module';
import { CryptocurrencyModule } from './cryptocurrency/cryptocurrency.module';
import { CryptoExchangeModule } from './crypto-exchange/crypto-exchange.module';
import { TradeModule } from './trade/trade.module';
import { StrategiesModule } from './strategies/strategies.module';
import { WalletModule } from './wallet/wallet.module';
import { HistoryBuyModule } from './history-buy/history-buy.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
    }),
    PrismaModule,
    CronModule,

    WalletModule,
    CryptocurrencyModule,
    HistoryBuyModule,
    CryptoExchangeModule,
    TradeModule,
    StrategiesModule,
  ],
})
export class AppModule {}
