import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  findAll(@CurrentUser() user: { id: string }) {
    return this.wishlistsService.findByUser(user.id);
  }

  @Post(':giftId')
  addItem(
    @CurrentUser() user: { id: string },
    @Param('giftId') giftId: string,
  ) {
    return this.wishlistsService.addItem(user.id, giftId);
  }

  @Delete(':itemId')
  removeItem(
    @CurrentUser() user: { id: string },
    @Param('itemId') itemId: string,
  ) {
    return this.wishlistsService.removeItem(itemId, user.id);
  }

  @Get('check/:giftId')
  checkItem(
    @CurrentUser() user: { id: string },
    @Param('giftId') giftId: string,
  ) {
    return this.wishlistsService.checkItem(user.id, giftId);
  }
}
