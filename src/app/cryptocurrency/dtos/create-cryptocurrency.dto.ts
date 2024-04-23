import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';

const createCryptocurrencySchema = z.object({
  name: z.string({ required_error: 'name is required' }),
  symbol: z.string({ required_error: 'symbol is required' }),
});

export class CreateCryptocurrencyDto extends createZodDto(
  createCryptocurrencySchema,
) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  symbol: string;
}
