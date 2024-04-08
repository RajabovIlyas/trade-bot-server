import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HistoryBuy } from '@prisma/client';

@Injectable()
export class HistoryBuyService {
  constructor(private prisma: PrismaService) {}

  find(historyBuy?: Partial<HistoryBuy>) {
    return this.prisma.historyBuy.findMany({ where: historyBuy });
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

  changeById(id: string, data: Partial<HistoryBuy>) {
    return this.prisma.historyBuy.update({
      where: { id },
      data,
    });
  }
}
