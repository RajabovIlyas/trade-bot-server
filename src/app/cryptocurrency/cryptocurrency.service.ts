import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cryptocurrency, Prisma } from '@prisma/client';
import {
  ERROR_UNIQUE_CODE,
  ERROR_UNIQUE_SYMBOL_IN_CRYPTOCURRENCY,
} from './constants/cryptocurrency.constant';
import { SortParams } from '@/query-params/sort-by.params';
import { WalletService } from '@/app/wallet/wallet.service';

@Injectable()
export class CryptocurrencyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly walletService: WalletService,
  ) {}

  find({
    cryptocurrency,
    sortParams,
  }: {
    cryptocurrency?: Prisma.CryptocurrencyWhereInput;
    sortParams: SortParams<Cryptocurrency>;
  }) {
    const { propertyOrder, sortOrder } = sortParams;
    return this.prisma.cryptocurrency.findMany({
      where: cryptocurrency,
      orderBy: {
        [propertyOrder]: sortOrder,
      },
    });
  }

  findById(id: string) {
    return this.prisma.cryptocurrency.findFirst({ where: { id } });
  }

  async create(data: Omit<Cryptocurrency, 'id'>) {
    try {
      return await this.prisma.cryptocurrency.create({ data });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === ERROR_UNIQUE_CODE) {
          throw new HttpException(
            ERROR_UNIQUE_SYMBOL_IN_CRYPTOCURRENCY,
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  deleteById(id: string) {
    return this.prisma.cryptocurrency.delete({ where: { id } });
  }

  changeById(id: string, data: Partial<Cryptocurrency>) {
    return this.prisma.cryptocurrency.update({
      where: { id },
      data,
    });
  }

  async getUseCryptocurrencies() {
    const cryptocurrencyIds = await this.walletService.getUseCryptocurrencies();

    return this.prisma.cryptocurrency.findMany({
      where: {
        id: {
          in: cryptocurrencyIds.map(({ cryptocurrencyId }) => cryptocurrencyId),
        },
      },
      select: {
        id: true,
        symbol: true,
      },
    });
  }
}
