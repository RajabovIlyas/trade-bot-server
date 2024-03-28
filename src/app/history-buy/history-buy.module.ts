import { Module } from '@nestjs/common';
import { HistoryBuyService } from './history-buy.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [HistoryBuyService],
})
export class HistoryBuyModule {}
