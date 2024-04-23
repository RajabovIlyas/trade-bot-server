import { Injectable, Logger } from '@nestjs/common';
import { CryptoExchangeService } from '../crypto-exchange/crypto-exchange.service';
import { StrategiesService } from '../strategies/strategies.service';
import {
  Cryptocurrency,
  HistoryBuy,
  StrategyAction,
  TradeAction,
  Wallet,
} from '@prisma/client';
import { SP_SAVE_PROPERTY } from '../strategies/constants/strategies-save.constant';
import { CryptocurrencyService } from '@/app/cryptocurrency/cryptocurrency.service';
import { WalletService } from '@/app/wallet/wallet.service';
import { HistoryBuyService } from '@/app/history-buy/history-buy.service';

@Injectable()
export class TradeService {
  private readonly logger = new Logger(TradeService.name);
  constructor(
    private cryptoExchange: CryptoExchangeService,
    private strategiesService: StrategiesService,
    private cryptocurrencyService: CryptocurrencyService,
    private walletService: WalletService,
    private historyBuyService: HistoryBuyService,
  ) {}

  prepareDataToSave(cryptoHistory, closePrices: number[]) {
    return {
      ...SP_SAVE_PROPERTY.reduce(
        (acc, { key, strategyKey }) => ({
          ...acc,
          [key]: {
            ...this.strategiesService[strategyKey](closePrices),
            strategy: key,
            count: 0,
            date: new Date(cryptoHistory.time * 1000),
            price: cryptoHistory.close,
          },
        }),
        {} as { [key in StrategyAction]: Omit<HistoryBuy, 'id' | 'walletId'> },
      ),
    };
  }

  async buyOrCellByWallet(
    prepareData: Omit<HistoryBuy, 'id' | 'walletId'>,
    wallet: Wallet,
  ) {
    const { price } = prepareData;
    const getLastTransaction = await this.historyBuyService.getLastByWalletId(
      wallet.id,
    );

    if (prepareData.status === TradeAction.wait) {
      return;
    }

    this.logger.log(`${prepareData.status} result for ${wallet.name}`);

    if (
      prepareData.status === TradeAction.buy &&
      wallet.usd >= 10 &&
      (!getLastTransaction.price || getLastTransaction.price > price)
    ) {
      return Promise.all([
        this.historyBuyService.create({
          ...prepareData,
          count: 10 / price,
          walletId: wallet.id,
        }),
        this.walletService.updateById(wallet.id, {
          usd: wallet.usd - 10,
          cryptocurrencyQuantity: wallet.cryptocurrencyQuantity + 10 / price,
        }),
      ]);
    }

    return Promise.all([
      this.historyBuyService.create({
        ...prepareData,
        count: wallet.cryptocurrencyQuantity,
        walletId: wallet.id,
      }),
      this.walletService.updateById(wallet.id, {
        usd: wallet.usd + wallet.cryptocurrencyQuantity * price,
        cryptocurrencyQuantity: 0,
      }),
    ]);
  }

  async tradeCalculator({ symbol, id }: Pick<Cryptocurrency, 'id' | 'symbol'>) {
    const cryptoPriceHistory =
      await this.cryptoExchange.getCryptoDataLastDaysByHour(symbol);

    const cryptoHistory = cryptoPriceHistory[cryptoPriceHistory.length - 1];
    const closePrices = cryptoPriceHistory.map(({ close }) => close);

    const prepareData = this.prepareDataToSave(cryptoHistory, closePrices);

    const wallets = await this.walletService.find({ cryptocurrencyId: id });

    await Promise.all(
      wallets.map((wallet) => {
        this.buyOrCellByWallet(prepareData[wallet.strategy], wallet);
      }),
    );
  }

  async tradeCalculatorByHour() {
    const cryptocurrencies =
      await this.cryptocurrencyService.getUseCryptocurrencies();

    await Promise.all(
      cryptocurrencies.map((data) => this.tradeCalculator(data)),
    );
  }
}
