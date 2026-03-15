import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishlistItem } from './wishlist-item.entity.js';
import { GiftsService } from '../gifts/gifts.service.js';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(WishlistItem)
    private readonly wishlistRepository: Repository<WishlistItem>,
    private readonly giftsService: GiftsService,
  ) {}

  async findByUser(userId: string): Promise<WishlistItem[]> {
    return this.wishlistRepository.find({
      where: { userId },
      order: { addedAt: 'DESC' },
    });
  }

  async addItem(userId: string, giftId: string): Promise<WishlistItem> {
    await this.giftsService.findById(giftId);

    const existing = await this.wishlistRepository.findOne({
      where: { userId, giftId },
    });
    if (existing) {
      throw new ConflictException('Gift already in wishlist');
    }

    const item = this.wishlistRepository.create({ userId, giftId });
    return this.wishlistRepository.save(item);
  }

  async removeItem(id: string, userId: string): Promise<void> {
    const item = await this.wishlistRepository.findOne({
      where: { id, userId },
    });
    if (!item) {
      throw new NotFoundException('Wishlist item not found');
    }
    await this.wishlistRepository.remove(item);
  }

  async checkItem(
    userId: string,
    giftId: string,
  ): Promise<{ inWishlist: boolean }> {
    const item = await this.wishlistRepository.findOne({
      where: { userId, giftId },
    });
    return { inWishlist: !!item };
  }
}
