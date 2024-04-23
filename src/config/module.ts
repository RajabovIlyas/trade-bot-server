export interface Environment {
  production?: boolean;

  NODE_ENV?: string;
  globalPrefix?: string;
  port?: number;
  urlCryptoExchange?: string;
  cryptoCompare?: string;
  glassNode?: string;
}
