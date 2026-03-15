import {
  IsEnum,
  IsObject,
  IsString,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RedemptionMethod } from '../../../common/enums/redemption-method.enum.js';

export class PhysicalDetailsDto {
  @IsString()
  address!: string;

  @IsString()
  city!: string;

  @IsString()
  state!: string;

  @IsString()
  zipCode!: string;

  @IsString()
  country!: string;
}

export class CashDetailsDto {
  @IsString()
  bankName!: string;

  @IsString()
  accountNumber!: string;

  @IsString()
  routingNumber!: string;
}

export class CryptoDetailsDto {
  @IsEnum(['BTC', 'ETH', 'USDT', 'BNB'])
  cryptocurrency!: string;

  @IsString()
  walletAddress!: string;
}

export class CharityDetailsDto {
  @IsString()
  charityName!: string;

  @IsString()
  charityId!: string;
}

export class CreateRedemptionDto {
  @IsEnum(RedemptionMethod)
  method!: RedemptionMethod;

  @IsObject()
  details!: Record<string, string>;
}
