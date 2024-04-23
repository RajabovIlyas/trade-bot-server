import { Controller, Get, Param, Query } from '@nestjs/common';
import { HistoryBuyService } from './history-buy.service';
import { ParamsIdDto } from './dto/params-id.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryHistoryBuyDto } from './dto/query-history-buy.dto';

@ApiTags('history-buy')
@Controller('history-buy')
export class HistoryBuyController {
  constructor(private readonly historyBuyService: HistoryBuyService) {}

  @Get()
  findAll(@Query() query: QueryHistoryBuyDto) {
    return this.historyBuyService.find({ sortParams: query });
  }

  @Get(':id')
  findById(@Param() { id }: ParamsIdDto) {
    return this.historyBuyService.findById(id);
  }

  @Get('wallet/:id')
  findOne(@Param() { id }: ParamsIdDto) {
    return this.historyBuyService.findByWalletId(id);
  }
}
