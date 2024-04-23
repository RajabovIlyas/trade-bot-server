import { HistoryBuy } from '@prisma/client';

export const HISTORY_BUY_PROPERTIES: (keyof HistoryBuy)[] = [
  'id',
  'walletId',
  'price',
  'count',
  'createdAt',
  'updatedAt',
];
