import { Controller, Post, Param, Body, UseGuards } from '@nestjs/common';
import { RedemptionsService } from './redemptions.service.js';
import { CreateRedemptionDto } from './dto/create-redemption.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class RedemptionsController {
  constructor(private readonly redemptionsService: RedemptionsService) {}

  @Post(':orderId/redeem')
  create(
    @CurrentUser() user: { id: string },
    @Param('orderId') orderId: string,
    @Body() dto: CreateRedemptionDto,
  ) {
    return this.redemptionsService.create(user.id, orderId, dto);
  }
}
