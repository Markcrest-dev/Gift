import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { UsersService } from '../users/users.service.js';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  create(
    @CurrentUser() user: { id: string },
    @Body() dto: CreateOrderDto,
  ) {
    return this.ordersService.create(user.id, dto);
  }

  @Get('sent')
  findSent(@CurrentUser() user: { id: string }) {
    return this.ordersService.findSentOrders(user.id);
  }

  @Get('received')
  async findReceived(@CurrentUser() user: { id: string }) {
    const fullUser = await this.usersService.findById(user.id);
    if (!fullUser) {
      return [];
    }
    return this.ordersService.findReceivedOrders(fullUser.email);
  }
}
