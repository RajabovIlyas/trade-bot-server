import { calculateEMA } from './indicators/EMA.indicator';
import { Logger } from '@nestjs/common';

export function calculatePPO(prices, shortPeriod, longPeriod) {
  if (prices.length < longPeriod) {
    logger.warn('Insufficient data for PPO calculation.');
    return;
  }

  const shortEMA = calculateEMA(prices, shortPeriod);
  const longEMA = calculateEMA(prices, longPeriod);
  return ((shortEMA - longEMA) / longEMA) * 100;
}

const logger = new Logger(calculatePPO.name);
