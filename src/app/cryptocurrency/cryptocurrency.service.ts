import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cryptocurrency, Prisma } from '@prisma/client';
import {
  ERROR_UNIQUE_CODE,
  ERROR_UNIQUE_SYMBOL_IN_CRYPTOCURRENCY,
} from './cryptocurrency.constant';

@Injectable()
export class CryptocurrencyService {
  constructor(private prisma: PrismaService) {}

  find(cryptocurrency?: Partial<Cryptocurrency>) {
    return this.prisma.cryptocurrency.findMany({ where: cryptocurrency });
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
}
