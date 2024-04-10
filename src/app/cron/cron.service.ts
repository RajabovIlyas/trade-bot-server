import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TradeService } from '../trade/trade.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private tradeService: TradeService) {}

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async everyDay() {
    this.logger.log('Start cron');
    await this.tradeService.makeCryptoDecision();
    this.logger.log('Finish cron');
  }
}
