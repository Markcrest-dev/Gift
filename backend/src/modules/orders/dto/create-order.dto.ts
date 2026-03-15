import {
  IsString,
  IsEmail,
  IsUUID,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsDateString,
  MinLength,
} from 'class-validator';
import { PaymentMethod } from '../../../common/enums/payment-method.enum.js';

export class CreateOrderDto {
  @IsEmail()
  recipientEmail!: string;

  @IsString()
  @MinLength(1)
  recipientName!: string;

  @IsUUID()
  giftId!: string;

  @IsString()
  message!: string;

  @IsOptional()
  @IsDateString()
  deliveryDate?: string;

  @IsOptional()
  @IsBoolean()
  anonymous?: boolean;

  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;
}
