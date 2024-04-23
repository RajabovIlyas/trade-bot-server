import { Prisma } from '@prisma/client';

export type SortBy = Prisma.SortOrder;

export const SORT_BY: SortBy[] = ['asc', 'desc'];

export interface SortParams<T> {
  sortOrder: SortBy;
  propertyOrder: keyof T;
}
