import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import {
  getCryptoCompare,
  getCryptoCompareLastDaysByHour,
  getCryptoCompareLastDaysByMinute,
  getCryptoCompareLastMonthByHour,
  getCryptoCompareLastThreeYears,
} from './crypto-exchange.endpoint';
import { ReqCrypto } from './interfaces/req-crypto.interface';
import { ReqCryptoPrice } from './interfaces/req-crypto-price.interface';

@Injectable()
export class CryptoExchangeService {
  private readonly logger = new Logger(CryptoExchangeService.name);
  constructor(private readonly httpService: HttpService) {}

  async getCryptoDataLastMonth(
    cryptoSymbol: string,
  ): Promise<ReqCryptoPrice[]> {
    const data = await firstValueFrom(
      this.httpService.get(getCryptoCompare(cryptoSymbol)).pipe(
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

  async getCryptoDataLastThreeYears(
    cryptoSymbol: string,
  ): Promise<ReqCryptoPrice[]> {
    const data = await firstValueFrom(
      this.httpService.get(getCryptoCompareLastThreeYears(cryptoSymbol)).pipe(
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

  async getCryptoDataLastDaysByHour(
    cryptoSymbol: string,
  ): Promise<ReqCryptoPrice[]> {
    const data = await firstValueFrom(
      this.httpService.get(getCryptoCompareLastDaysByHour(cryptoSymbol)).pipe(
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

  async getCryptoCompareLastMonthByHour(
    cryptoSymbol: string,
  ): Promise<ReqCryptoPrice[]> {
    const data = await firstValueFrom(
      this.httpService.get(getCryptoCompareLastMonthByHour(cryptoSymbol)).pipe(
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

  async getCryptoDataLastDayByMinute(
    cryptoSymbol: string,
  ): Promise<ReqCryptoPrice[]> {
    const data = await firstValueFrom(
      this.httpService.get(getCryptoCompareLastDaysByMinute(cryptoSymbol)).pipe(
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
