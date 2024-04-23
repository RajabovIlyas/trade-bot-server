import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';
import { HISTORY_BUY_PROPERTIES } from '../constants/history-buy-property.constant';
import { SORT_BY, SortBy } from '@/query-params/sort-by.params';
import { HistoryBuy } from '@prisma/client';
import { zodEnum } from '@/options/zod-enum.option';

const queryHistoryBuySchema = z.object({
  sortOrder: z
    .enum(zodEnum(SORT_BY), {
      required_error: 'property must be required',
    })
    .default('asc'),
  propertyOrder: z
    .enum(zodEnum(HISTORY_BUY_PROPERTIES), {
      required_error: 'property must be required',
    })
    .default('id'),
});

export class QueryHistoryBuyDto extends createZodDto(queryHistoryBuySchema) {
  @ApiProperty({ enum: SORT_BY, required: false })
  sortOrder: SortBy;

  @ApiProperty({ enum: HISTORY_BUY_PROPERTIES, required: false })
  propertyOrder: keyof HistoryBuy;
}
