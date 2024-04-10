export function calculateEMA(data: number[], period: number) {
  const multiplier = 2 / (period + 1);
  let ema = data.slice(-period).reduce((sum, price) => sum + price, 0) / period;

  for (let i = period; i < data.length; i++) {
    ema = (data[i] - ema) * multiplier + ema;
  }

  return ema;
}
