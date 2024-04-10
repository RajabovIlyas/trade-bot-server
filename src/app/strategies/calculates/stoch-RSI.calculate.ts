export function calculateSTOCH(closingPrices: number[], period: number) {
  const periodPrices = closingPrices.slice(-period);
  let lowestLow = Number.MAX_VALUE;
  let highestHigh = Number.MIN_VALUE;

  for (let i = 0; i < periodPrices.length; i++) {
    lowestLow = Math.min(lowestLow, periodPrices[i]);
    highestHigh = Math.max(highestHigh, periodPrices[i]);
  }

  const stoch =
    ((periodPrices[periodPrices.length - 1] - lowestLow) /
      (highestHigh - lowestLow)) *
    100;

  return stoch;
}
