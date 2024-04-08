import { Environment } from './module';
import * as process from 'process';

export const configDevelopment: Environment = {
  production: false,

  NODE_ENV: 'development',
  port: 3000,
  urlCryptoExchange: 'https://min-api.cryptocompare.com',
  cryptoCompare: process.env.CRYPTO_COMPARE,
  glassNode: process.env.GLASS_NODE,
};
