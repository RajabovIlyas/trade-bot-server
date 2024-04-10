export function calculateRSI(closingPrices: number[], period = 15) {
  const periodPrices = closingPrices.slice(-period);

  let gains = 0;
  let losses = 0;

  for (let i = 1; i < periodPrices.length; i++) {
    const change = periodPrices[i] - periodPrices[i - 1];
    if (change > 0) {
      gains += change;
    } else {
      losses -= change;
    }
  }

  const avgGain = gains / period;
  const avgLoss = losses / period;

  const rs = avgGain / avgLoss;

  return 100 - 100 / (1 + rs);
}
