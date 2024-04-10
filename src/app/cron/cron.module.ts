import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { TradeModule } from '../trade/trade.module';

@Module({
  imports: [TradeModule],
  providers: [CronService],
})
export class CronModule {}
