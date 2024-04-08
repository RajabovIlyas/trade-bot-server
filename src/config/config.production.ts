import { Environment } from './module';

export const configProduction: Environment = {
  production: true,

  NODE_ENV: 'production',
  port: 3000,
  urlCryptoExchange: 'https://min-api.cryptocompare.com',
  cryptoCompare:
    '54c69a67adfc783963d3589c5a08a40a5d619b0f22b94b1c79df9acc9129c5ff',
  glassNode: '1pzEImQbuhq9Qj0LynC5b4oqQog',
};
