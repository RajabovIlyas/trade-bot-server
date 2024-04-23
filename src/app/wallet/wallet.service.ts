import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Wallet, Prisma } from '@prisma/client';
import { SortParams } from '@/query-params/sort-by.params';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  find(wallet?: Partial<Wallet>) {
    return this.prisma.wallet.findMany({
      where: wallet,
    });
  }

  findWithSort({
    wallet,
    sortParams,
  }: {
    wallet?: Partial<Wallet>;
    sortParams: SortParams<Wallet>;
  }) {
    const { propertyOrder, sortOrder } = sortParams;
    return this.prisma.wallet.findMany({
      where: wallet,
      orderBy: {
        [propertyOrder]: sortOrder,
      },
      select: {
        name: true,
        usd: true,
        cryptocurrencyQuantity: true,
        strategy: true,
        cryptocurrency: {
          select: {
            name: true,
            symbol: true,
          },
        },
      },
    });
  }

  findById(id: string) {
    return this.prisma.wallet.findFirst({ where: { id } });
  }

  async create(data: Prisma.WalletUncheckedCreateInput) {
    try {
      return await this.prisma.wallet.create({ data });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  deleteById(id: string) {
    return this.prisma.wallet.delete({ where: { id } });
  }

  updateById(id: string, data: Partial<Wallet>) {
    return this.prisma.wallet.update({
      where: { id },
      data,
    });
  }

  getUseCryptocurrencies() {
    return this.prisma.wallet.groupBy({ by: ['cryptocurrencyId'] });
  }
}
