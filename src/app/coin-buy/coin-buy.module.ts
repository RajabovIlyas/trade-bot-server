import { Module } from '@nestjs/common';
import { CoinBuyService } from './coin-buy.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CoinBuyService],
  exports: [CoinBuyService],
})
export class CoinBuyModule {}
