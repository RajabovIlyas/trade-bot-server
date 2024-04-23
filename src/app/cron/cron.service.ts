import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TradeService } from '../trade/trade.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private tradeService: TradeService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async everyHour() {
    this.logger.log('Start cron: Trade by hour!');
    await this.tradeService.tradeCalculatorByHour();
    this.logger.log('Finish cron: Trade by hour!');
  }
}
