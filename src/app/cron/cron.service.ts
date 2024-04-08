import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CoinBuyService } from '../coin-buy/coin-buy.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private coinBuyService: CoinBuyService) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async everyDay() {
    this.logger.log('Start cron');
    await this.coinBuyService.checkRsiToBuy();
    this.logger.log('Finish cron');
  }
}
