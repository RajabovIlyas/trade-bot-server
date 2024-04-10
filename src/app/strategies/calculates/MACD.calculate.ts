import { calculateEMA } from './indicators/EMA.indicator';

export function calculateMACD(closingPrices: number[]) {
  const ema12 = calculateEMA(closingPrices, 12);
  const ema26 = calculateEMA(closingPrices, 26);
  return ema12 - ema26;
}
