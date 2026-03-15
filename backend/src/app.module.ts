import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { GiftsModule } from './modules/gifts/gifts.module.js';
import { OrdersModule } from './modules/orders/orders.module.js';
import { RedemptionsModule } from './modules/redemptions/redemptions.module.js';
import { WishlistsModule } from './modules/wishlists/wishlists.module.js';
import { NotificationsModule } from './modules/notifications/notifications.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(databaseConfig),
    AuthModule,
    UsersModule,
    GiftsModule,
    OrdersModule,
    RedemptionsModule,
    WishlistsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
