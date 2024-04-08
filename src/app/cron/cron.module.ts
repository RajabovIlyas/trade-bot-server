import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CoinBuyModule } from '../coin-buy/coin-buy.module';

@Module({
  imports: [CoinBuyModule],
  providers: [CronService],
})
export class CronModule {}
