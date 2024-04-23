import { Module } from '@nestjs/common';
import { CryptocurrencyService } from './cryptocurrency.service';
import { CryptocurrencyController } from './cryptocurrency.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { WalletModule } from '@/app/wallet/wallet.module';

@Module({
  imports: [PrismaModule, WalletModule],
  providers: [CryptocurrencyService],
  controllers: [CryptocurrencyController],
  exports: [CryptocurrencyService],
})
export class CryptocurrencyModule {}
