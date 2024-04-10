import { Injectable, Logger } from '@nestjs/common';
import { CryptoExchangeService } from '../crypto-exchange/crypto-exchange.service';
import { StrategiesService } from '../strategies/strategies.service';

@Injectable()
export class TradeService {
  private readonly logger = new Logger(TradeService.name);
  constructor(
    private cryptoExchange: CryptoExchangeService,
    private strategiesService: StrategiesService,
  ) {}

  async makeCryptoDecision() {
    const cryptoPriceHistory = await this.cryptoExchange.getCryptoHistory();
    const closePrices = cryptoPriceHistory.map(({ close }) => close);

    const result = {
      resultCCI: this.strategiesService.checkCCI(closePrices),
      resultRSI: this.strategiesService.checkRSI(closePrices),
      resultSTOCH: this.strategiesService.checkSTOCH(closePrices),
      resultMACD: this.strategiesService.checkMACD(closePrices),
      resultPPO: this.strategiesService.checkPPO(closePrices),
      resultDEMA: this.strategiesService.checkDEMA(closePrices),
    };

    this.logger.log(`
    resultCCI: ${result.resultCCI}
    resultRSI: ${result.resultRSI}
    resultSTOCH: ${result.resultSTOCH}
    resultMACD: ${result.resultMACD}
    resultPPO: ${result.resultPPO}
    resultDEMA: ${result.resultDEMA}`);
  }
}
