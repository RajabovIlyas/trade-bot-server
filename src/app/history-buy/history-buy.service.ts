import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HistoryBuy, Prisma } from '@prisma/client';
import { SortParams } from '@/query-params/sort-by.params';

@Injectable()
export class HistoryBuyService {
  constructor(private prisma: PrismaService) {}

  find({
    historyBuy,
    sortParams,
  }: {
    historyBuy?: Prisma.HistoryBuyWhereInput;
    sortParams: SortParams<HistoryBuy>;
  }) {
    const { propertyOrder, sortOrder } = sortParams;
    return this.prisma.historyBuy.findMany({
      where: historyBuy,
      orderBy: {
        [propertyOrder]: sortOrder,
      },
    });
  }

  findByWalletId(id: string) {
    return this.prisma.historyBuy.findFirst({ where: { walletId: id } });
  }

  findById(id: string) {
    return this.prisma.historyBuy.findFirst({ where: { id } });
  }

  async create(data: Omit<HistoryBuy, 'id'>) {
    try {
      return await this.prisma.historyBuy.create({ data });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  deleteById(id: string) {
    return this.prisma.historyBuy.delete({ where: { id } });
  }

  getLastByWalletId(walletId: string) {
    return this.prisma.historyBuy.findFirst({
      where: { walletId },
      orderBy: { updatedAt: Prisma.SortOrder.desc },
    });
  }
}
