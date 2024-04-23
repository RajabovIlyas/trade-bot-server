import { Environment } from './module';
import * as process from 'process';

export const configDevelopment: Environment = {
  production: false,

  NODE_ENV: 'development',
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  globalPrefix: '/api',
  urlCryptoExchange: 'https://min-api.cryptocompare.com',
  cryptoCompare: process.env.CRYPTO_COMPARE,
  glassNode: process.env.GLASS_NODE,
};
