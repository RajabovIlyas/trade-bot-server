import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';

const paramsIdSchema = z.object({
  id: z
    .string({
      required_error: 'cryptocurrencyId is required',
    })
    .uuid('cryptocurrencyId must be uuid'),
});

export class ParamsIdDto extends createZodDto(paramsIdSchema) {
  @ApiProperty()
  id: string;
}
