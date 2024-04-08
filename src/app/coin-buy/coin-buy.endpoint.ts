import config from '../../config';

export const getCryptoCompare = (query: string) =>
  `${config.urlCryptoExchange}/data/v2/histoday?fsym=${query}&tsym=USD&limit=14&api_key=${config.cryptoCompare}`;
