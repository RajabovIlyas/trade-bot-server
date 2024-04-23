import { Module } from '@nestjs/common';
import { HistoryBuyService } from './history-buy.service';
import { HistoryBuyController } from './history-buy.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HistoryBuyController],
  providers: [HistoryBuyService],
  exports: [HistoryBuyService],
})
export class HistoryBuyModule {}
