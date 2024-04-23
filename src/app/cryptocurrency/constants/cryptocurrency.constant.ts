import { Cryptocurrency } from '@prisma/client';

export const ERROR_UNIQUE_SYMBOL_IN_CRYPTOCURRENCY =
  'There is a unique constraint violation, a new Cryptocurrency cannot be created with this symbol';

export const ERROR_UNIQUE_CODE = 'P2002';

export const CRYPTOCURRENCY_PROPERTIES: (keyof Cryptocurrency)[] = [
  'id',
  'name',
  'symbol',
  'createdAt',
  'updatedAt',
];
