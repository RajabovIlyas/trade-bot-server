import { Module } from '@nestjs/common';
import { TradeService } from './trade.service';
import { CryptoExchangeModule } from '../crypto-exchange/crypto-exchange.module';
import { StrategiesModule } from '../strategies/strategies.module';

@Module({
  imports: [CryptoExchangeModule, StrategiesModule],
  providers: [TradeService],
  exports: [TradeService],
})
export class TradeModule {}
