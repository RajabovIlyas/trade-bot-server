export interface Environment {
  production?: boolean;

  NODE_ENV?: string;
  port?: number;
  urlCryptoExchange?: string;
  cryptoCompare?: string;
  glassNode?: string;
}
