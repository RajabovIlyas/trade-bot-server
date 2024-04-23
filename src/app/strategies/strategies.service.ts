import { Injectable, Logger } from '@nestjs/common';
import { calculateCCI } from './calculates/CCI.calculate';
import { calculateRSI } from './calculates/RSI.calculate';
import { calculateSTOCH } from './calculates/stoch-RSI.calculate';
import { calculateMACD } from './calculates/MACD.calculate';
import { calculateDEMA } from './calculates/DEMA.calculate';
import { calculatePPO } from './calculates/PPO.calculate';
import { TradeAction } from '@prisma/client';
import {
  MAX_CCI,
  MAX_MACD,
  MAX_RSI,
  MIN_CCI,
  MIN_MACD,
  MIN_RSI,
} from './constants/strategies-params';
import { TradeResult } from '@/app/strategies/interfaces/calculate-strategies.interface';
import { TradeActions } from '@/app/strategies/enums/trade-actions.enum';

function checkTradeResult(calculated: number, min: number, max: number) {
  if (min > calculated) {
    return TradeAction.buy;
  }
  if (max < calculated) {
    return TradeActions.cell;
  }
  return TradeActions.wait;
}

function checkTradeWithOldResult(oldResult: number, nowResult: number) {
  if (0 < oldResult && nowResult < 0) {
    return TradeAction.buy;
  }

  if (0 > oldResult && nowResult > 0) {
    return TradeAction.cell;
  }

  return TradeAction.wait;
}

@Injectable()
export class StrategiesService {
  private readonly logger = new Logger(StrategiesService.name);

  checkCCI(prices: number[]): TradeResult {
    const CCI = calculateCCI(prices, 15);

    // CCI -150> buy, 200 < cell

    return {
      status: checkTradeResult(CCI, MIN_CCI, MAX_CCI),
      calculated: CCI,
    };
  }

  checkRSI(prices: number[]): TradeResult {
    const RSI = calculateRSI(prices, 14);

    return {
      status: checkTradeResult(RSI, MIN_RSI, MAX_RSI),
      calculated: RSI,
    };
  }

  checkSTOCH(prices: number[]): TradeResult {
    const STOCH = calculateSTOCH(prices, 14);

    return {
      status: checkTradeResult(STOCH, MIN_RSI, MAX_RSI),
      calculated: STOCH,
    };
  }

  checkMACD(prices: number[]): TradeResult {
    const MACD = calculateMACD(prices);

    return {
      status: checkTradeResult(MACD, MIN_MACD, MAX_MACD),
      calculated: MACD,
    };
  }

  checkPPO(prices: number[]): TradeResult {
    const nowPPO = calculatePPO(prices, 9, 21);

    const oldPPO = calculatePPO(prices.slice(0, prices.length - 1), 9, 21);

    return {
      calculated: oldPPO - nowPPO,
      status: checkTradeWithOldResult(oldPPO, nowPPO),
    };
  }

  checkDEMA(prices: number[]): TradeResult {
    const nowDEMA = calculateDEMA(prices, 9) - calculateDEMA(prices, 21);
    const oldPrices = prices.slice(0, prices.length - 1);
    const oldDEMA = calculateDEMA(oldPrices, 9) - calculateDEMA(oldPrices, 21);

    return {
      calculated: oldDEMA - nowDEMA,
      status: checkTradeWithOldResult(oldDEMA, nowDEMA),
    };
  }
}
