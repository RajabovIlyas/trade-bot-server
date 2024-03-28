import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CronModule } from './cron/cron.module';
import { BuyerModule } from './buyer/buyer.module';
import { CryptocurrencyModule } from './cryptocurrency/cryptocurrency.module';
import { HistoryBuyModule } from './history-buy/history-buy.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CronModule,

    BuyerModule,
    CryptocurrencyModule,
    HistoryBuyModule,
  ],
})
export class AppModule {}
