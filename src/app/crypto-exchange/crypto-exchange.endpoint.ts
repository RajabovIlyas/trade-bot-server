import config from '@/config';

export const getCryptoCompare = (query: string) =>
  `${config.urlCryptoExchange}/data/v2/histoday?fsym=${query}&tsym=USD&limit=30&api_key=${config.cryptoCompare}`;

export const getCryptoCompareLastThreeYears = (query: string) =>
  `${config.urlCryptoExchange}/data/v2/histoday?fsym=${query}&tsym=USD&limit=1095&api_key=${config.cryptoCompare}`;

export const getCryptoCompareLastDaysByHour = (query: string) =>
  `${config.urlCryptoExchange}/data/v2/histohour?fsym=${query}&tsym=USD&limit=48&api_key=${config.cryptoCompare}`;

export const getCryptoCompareLastMonthByHour = (query: string) =>
  `${config.urlCryptoExchange}/data/v2/histohour?fsym=${query}&tsym=USD&limit=740&api_key=${config.cryptoCompare}`;

export const getCryptoCompareLastDaysByMinute = (query: string) =>
  `${config.urlCryptoExchange}/data/v2/histominute?fsym=${query}&tsym=USD&limit=1440&api_key=${config.cryptoCompare}`;
