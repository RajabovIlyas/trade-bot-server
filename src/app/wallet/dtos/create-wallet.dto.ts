import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { StrategyAction } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

const createWalletSchema = z.object({
  name: z.string({ required_error: 'name is required' }),
  usd: z.number().default(100),
  cryptocurrencyQuantity: z.number().default(0),
  strategy: z.nativeEnum(StrategyAction, {
    required_error: 'strategy is required',
  }),
  cryptocurrencyId: z
    .string({
      required_error: 'cryptocurrencyId is required',
    })
    .uuid('cryptocurrencyId must be uuid'),
});

export class CreateWalletDto extends createZodDto(createWalletSchema) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  usd: number;

  @ApiProperty()
  cryptocurrencyQuantity: number;

  @ApiProperty()
  strategy: StrategyAction;

  @ApiProperty()
  cryptocurrencyId: string;
}
