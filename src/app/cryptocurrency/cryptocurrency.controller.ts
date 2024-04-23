import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateCryptocurrencyDto } from './dtos/create-cryptocurrency.dto';
import { CryptocurrencyService } from './cryptocurrency.service';
import { Cryptocurrency } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { QueryCryptocurrencyDto } from './dtos/query-cryptocurrency.dto';

@ApiTags('cryptocurrency')
@Controller('cryptocurrency')
export class CryptocurrencyController {
  constructor(private readonly cryptocurrencyService: CryptocurrencyService) {}

  @Post()
  create(@Body() create: CreateCryptocurrencyDto) {
    return this.cryptocurrencyService.create(create as Cryptocurrency);
  }

  @Get()
  getAll(@Query() query: QueryCryptocurrencyDto) {
    return this.cryptocurrencyService.find({ sortParams: query });
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.cryptocurrencyService.findById(id);
  }
}
