export function calculateCCI(prices: number[], period: number) {
  const movingAverage =
    prices.slice(-period).reduce((sum, price) => sum + price, 0) / period;
  const meanDeviation =
    prices
      .slice(-period)
      .reduce((sum, price) => sum + Math.abs(price - movingAverage), 0) /
    period;

  return (prices[prices.length - 1] - movingAverage) / (0.015 * meanDeviation);
}
