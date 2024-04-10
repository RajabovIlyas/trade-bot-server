import { Injectable, Logger } from '@nestjs/common';
import { calculateCCI } from './calculates/CCI.calculate';
import { calculateRSI } from './calculates/RSI.calculate';
import { calculateSTOCH } from './calculates/stoch-RSI.calculate';
import { calculateMACD } from './calculates/MACD.calculate';
import { calculateDEMA } from './calculates/DEMA.calculate';
import { calculatePPO } from './calculates/PPO.calculate';
import { TradeActions } from './enums/trade-actions.enum';
import {
  MAX_CCI,
  MAX_MACD,
  MAX_RSI,
  MIN_CCI,
  MIN_MACD,
  MIN_RSI,
} from './constants';

@Injectable()
export class StrategiesService {
  private readonly logger = new Logger(StrategiesService.name);

  checkCCI(prices: number[]) {
    const CCI = calculateCCI(prices, 15);

    // CCI -150> buy, 200 < cell

    if (MIN_CCI > CCI) {
      return TradeActions.buy;
    }
    if (MAX_CCI < CCI) {
      return TradeActions.cell;
    }
    return TradeActions.wait;
  }

  checkRSI(prices: number[]) {
    const RSI = calculateRSI(prices, 14);

    if (MIN_RSI > RSI) {
      return TradeActions.buy;
    }
    if (MAX_RSI < RSI) {
      return TradeActions.cell;
    }

    return TradeActions.wait;
  }

  checkSTOCH(prices: number[]) {
    const stochRSI = calculateSTOCH(prices, 14);

    if (MIN_RSI > stochRSI) {
      return TradeActions.buy;
    }
    if (MAX_RSI < stochRSI) {
      return TradeActions.cell;
    }

    return TradeActions.wait;
  }

  checkMACD(prices: number[]) {
    const MACD = calculateMACD(prices);

    if (MIN_MACD > MACD) {
      return TradeActions.buy;
    }
    if (MAX_MACD < MACD) {
      return TradeActions.cell;
    }

    return TradeActions.wait;
  }

  checkPPO(prices: number[]) {
    const nowPPO = calculatePPO(prices, 9, 21);

    const oldPPO = calculatePPO(prices.slice(0, prices.length - 1), 9, 21);

    if (0 < oldPPO && nowPPO < 0) {
      return TradeActions.buy;
    }

    if (0 > oldPPO && nowPPO > 0) {
      return TradeActions.cell;
    }

    return TradeActions.wait;
  }

  checkDEMA(prices: number[]) {
    const nowDEMA = calculateDEMA(prices, 9) - calculateDEMA(prices, 21);
    const oldPrices = prices.slice(0, prices.length - 1);
    const oldDEMA = calculateDEMA(oldPrices, 9) - calculateDEMA(oldPrices, 21);

    if (nowDEMA > 0 && oldDEMA < 0) {
      return TradeActions.cell;
    }

    if (nowDEMA < 0 && oldDEMA > 0) {
      return TradeActions.buy;
    }

    return TradeActions.wait;
  }
}
