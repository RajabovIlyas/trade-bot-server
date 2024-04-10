import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { getCryptoCompare } from './crypto-exchange.endpoint';
import { ReqCrypto } from './interfaces/req-crypto.interface';
import { ReqCryptoPrice } from './interfaces/req-crypto-price.interface';

const QUERY = 'BTC';

@Injectable()
export class CryptoExchangeService {
  private readonly logger = new Logger(CryptoExchangeService.name);
  constructor(private readonly httpService: HttpService) {}

  async getCryptoHistory(): Promise<ReqCryptoPrice[]> {
    const data = await firstValueFrom(
      this.httpService.get(getCryptoCompare(QUERY)).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
        map((res: AxiosResponse<ReqCrypto>) => {
          return res.data;
        }),
      ),
    );
    return data.Data.Data;
  }
}
