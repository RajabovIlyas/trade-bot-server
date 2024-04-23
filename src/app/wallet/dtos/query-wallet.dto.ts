import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';
import { SORT_BY, SortBy } from '@/query-params/sort-by.params';
import { StrategyAction, Wallet } from '@prisma/client';
import { zodEnum } from '@/options/zod-enum.option';
import { WALLET_PROPERTIES } from '../constants/wallet.constant';

const queryWalletSchema = z.object({
  sortOrder: z
    .enum(zodEnum(SORT_BY), {
      required_error: 'property must be required',
    })
    .default('asc'),

  propertyOrder: z
    .enum(zodEnum(WALLET_PROPERTIES), {
      required_error: 'property must be required',
    })
    .default('id'),
  strategy: z
    .nativeEnum(StrategyAction, {
      required_error: 'strategy must be required',
    })
    .optional(),
  cryptocurrencyId: z.string().uuid('cryptocurrencyId must be uuid').optional(),
});

export class QueryWalletDto extends createZodDto(queryWalletSchema) {
  @ApiProperty({ enum: SORT_BY, required: false })
  sortOrder: SortBy;

  @ApiProperty({ enum: WALLET_PROPERTIES, required: false })
  propertyOrder: keyof Wallet;

  @ApiProperty({ enum: StrategyAction, required: false })
  strategy?: StrategyAction;

  @ApiProperty({ required: false })
  cryptocurrencyId?: string;
}
