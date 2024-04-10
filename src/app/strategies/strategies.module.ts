import { Module } from '@nestjs/common';
import { StrategiesService } from './strategies.service';
import { CryptoExchangeModule } from '../crypto-exchange/crypto-exchange.module';

@Module({
  imports: [CryptoExchangeModule],
  providers: [StrategiesService],
  exports: [StrategiesService],
})
export class StrategiesModule {}
