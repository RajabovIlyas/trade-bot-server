import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Buyer } from '@prisma/client';

@Injectable()
export class BuyerService {
  constructor(private prisma: PrismaService) {}

  find(buyer?: Partial<Buyer>) {
    return this.prisma.buyer.findMany({ where: buyer });
  }

  findById(id: string) {
    return this.prisma.buyer.findFirst({ where: { id } });
  }

  async create(data: Omit<Buyer, 'id'>) {
    try {
      return await this.prisma.buyer.create({ data });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  deleteById(id: string) {
    return this.prisma.buyer.delete({ where: { id } });
  }

  changeById(id: string, data: Partial<Buyer>) {
    return this.prisma.buyer.update({
      where: { id },
      data,
    });
  }
}
