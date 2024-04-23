import { Module } from '@nestjs/common';
import { TradeService } from './trade.service';
import { CryptoExchangeModule } from '../crypto-exchange/crypto-exchange.module';
import { StrategiesModule } from '../strategies/strategies.module';
import { CryptocurrencyModule } from '@/app/cryptocurrency/cryptocurrency.module';
import { WalletModule } from '@/app/wallet/wallet.module';
import { HistoryBuyModule } from '@/app/history-buy/history-buy.module';

@Module({
  imports: [
    CryptoExchangeModule,
    StrategiesModule,
    CryptocurrencyModule,
    WalletModule,
    HistoryBuyModule,
  ],
  providers: [TradeService],
  exports: [TradeService],
})
export class TradeModule {}
