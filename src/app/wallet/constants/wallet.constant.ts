import { Wallet } from '@prisma/client';

export const WALLET_PROPERTIES: (keyof Wallet)[] = [
  'id',
  'name',
  'usd',
  'cryptocurrencyQuantity',
  'strategy',
  'cryptocurrencyId',
  'createdAt',
  'updatedAt',
];
