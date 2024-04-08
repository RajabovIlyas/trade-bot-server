import { ReqCryptoData } from './req-crypto-data.interface';

export interface ReqCrypto {
  Response: string;
  Message: string;
  HasWarning: boolean;
  Type: number;
  RateLimit: object;
  Data: {
    Aggregated: string;
    TimeFrom: number;
    TimeTo: number;
    Data: ReqCryptoData[];
  };
}
