import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';
import { SORT_BY, SortBy } from '@/query-params/sort-by.params';
import { Cryptocurrency } from '@prisma/client';
import { CRYPTOCURRENCY_PROPERTIES } from '../constants/cryptocurrency.constant';
import { zodEnum } from '@/options/zod-enum.option';

const queryHistoryBuySchema = z.object({
  sortOrder: z
    .enum(zodEnum(SORT_BY), {
      required_error: 'property must be required',
    })
    .default('asc'),
  propertyOrder: z
    .enum(zodEnum(CRYPTOCURRENCY_PROPERTIES), {
      required_error: 'property must be required',
    })
    .default('id'),
});

export class QueryCryptocurrencyDto extends createZodDto(
  queryHistoryBuySchema,
) {
  @ApiProperty({ enum: SORT_BY, required: false })
  sortOrder: SortBy;

  @ApiProperty({ enum: CRYPTOCURRENCY_PROPERTIES, required: false })
  propertyOrder: keyof Cryptocurrency;
}
