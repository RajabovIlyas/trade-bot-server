import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { getCryptoCompare } from './coin-buy.endpoint';
import { ReqCrypto } from './interfaces/req-crypto.interface';
import { calculateRSI } from '../../calculates/rsi.calculate';

const QUERY = 'BTC';

@Injectable()
export class CoinBuyService {
  private readonly logger = new Logger(CoinBuyService.name);
  constructor(private readonly httpService: HttpService) {}

  getCryptoHistory(): Promise<ReqCrypto> {
    console.log(getCryptoCompare(QUERY));
    return firstValueFrom(
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
  }

  async checkRsiToBuy() {
    const data = await this.getCryptoHistory();
  }
}
