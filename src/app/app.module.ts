import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CronModule } from './cron/cron.module';
import { BuyerModule } from './buyer/buyer.module';
import { CryptocurrencyModule } from './cryptocurrency/cryptocurrency.module';
import { HistoryBuyModule } from './history-buy/history-buy.module';
import { CoinBuyModule } from './coin-buy/coin-buy.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
    }),
    PrismaModule,
    CronModule,

    BuyerModule,
    CryptocurrencyModule,
    HistoryBuyModule,
    CoinBuyModule,
  ],
})
export class AppModule {}
