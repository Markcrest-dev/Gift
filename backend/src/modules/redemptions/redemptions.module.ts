import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Redemption } from './redemption.entity.js';
import { RedemptionsService } from './redemptions.service.js';
import { RedemptionsController } from './redemptions.controller.js';
import { OrdersModule } from '../orders/orders.module.js';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Redemption]),
    OrdersModule,
    NotificationsModule,
    UsersModule,
  ],
  controllers: [RedemptionsController],
  providers: [RedemptionsService],
})
export class RedemptionsModule {}
