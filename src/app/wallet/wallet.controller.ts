import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dtos/create-wallet.dto';
import { ApiTags } from '@nestjs/swagger';
import { ParamsIdDto } from './dtos/params-id.dto';
import { QueryWalletDto } from '@/app/wallet/dtos/query-wallet.dto';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get()
  getAll(@Query() { sortOrder, propertyOrder, ...wallet }: QueryWalletDto) {
    return this.walletService.findWithSort({
      sortParams: { sortOrder, propertyOrder },
      wallet,
    });
  }

  @Get(':id')
  getById(@Param() { id }: ParamsIdDto) {
    return this.walletService.findById(id);
  }

  @Delete(':id')
  deleteById(@Param() { id }: ParamsIdDto) {
    return this.walletService.deleteById(id);
  }

  @Post()
  create(@Body() createWallet: CreateWalletDto) {
    return this.walletService.create(createWallet);
  }
}
