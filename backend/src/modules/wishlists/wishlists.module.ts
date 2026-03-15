import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistItem } from './wishlist-item.entity.js';
import { WishlistsService } from './wishlists.service.js';
import { WishlistsController } from './wishlists.controller.js';
import { GiftsModule } from '../gifts/gifts.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([WishlistItem]), GiftsModule],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}
