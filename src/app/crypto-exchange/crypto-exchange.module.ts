import { Module } from '@nestjs/common';
import { CryptoExchangeService } from './crypto-exchange.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CryptoExchangeService],
  exports: [CryptoExchangeService],
})
export class CryptoExchangeModule {}
