import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCryptocurrencyDto } from './dtos/create-cryptocurrency.dto';
import { CryptocurrencyService } from './cryptocurrency.service';
import { Cryptocurrency } from '@prisma/client';

@Controller('cryptocurrency')
export class CryptocurrencyController {
  constructor(private readonly cryptocurrencyService: CryptocurrencyService) {}

  @Post()
  create(@Body() create: CreateCryptocurrencyDto) {
    return this.cryptocurrencyService.create(create as Cryptocurrency);
  }

  @Get()
  getAll() {
    return this.cryptocurrencyService.find();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.cryptocurrencyService.findById(id);
  }
}
