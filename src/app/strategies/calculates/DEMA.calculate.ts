import { calculateEMA } from './indicators/EMA.indicator';
import { Logger } from '@nestjs/common';

export function calculateDEMA(prices: number[], period: number) {
  if (prices.length < period + 1) {
    logger.warn('Insufficient data for DEMA calculation.');
    return;
  }

  const ema1 = calculateEMA(prices, period);
  const ema2 = calculateEMA(prices.slice(-period), period);
  return 2 * ema1 - ema2;
}

const logger = new Logger(calculateDEMA.name);
