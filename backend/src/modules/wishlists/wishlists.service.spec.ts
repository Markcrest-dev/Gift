import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { WishlistsService } from './wishlists.service.js';
import { WishlistItem } from './wishlist-item.entity.js';
import { GiftsService } from '../gifts/gifts.service.js';

describe('WishlistsService', () => {
  let service: WishlistsService;
  let repository: Record<string, jest.Mock>;
  let giftsService: Record<string, jest.Mock>;

  const mockItem = {
    id: 'item-1',
    userId: 'user-1',
    giftId: 'gift-1',
    addedAt: new Date(),
  };

  beforeEach(async () => {
    repository = {
      find: jest.fn().mockResolvedValue([mockItem]),
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockReturnValue(mockItem),
      save: jest.fn().mockResolvedValue(mockItem),
      remove: jest.fn().mockResolvedValue(undefined),
    };

    giftsService = {
      findById: jest.fn().mockResolvedValue({ id: 'gift-1' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WishlistsService,
        { provide: getRepositoryToken(WishlistItem), useValue: repository },
        { provide: GiftsService, useValue: giftsService },
      ],
    }).compile();

    service = module.get<WishlistsService>(WishlistsService);
  });

  describe('findByUser', () => {
    it('should return wishlist items for user', async () => {
      const result = await service.findByUser('user-1');
      expect(result).toEqual([mockItem]);
    });
  });

  describe('addItem', () => {
    it('should add a gift to wishlist', async () => {
      const result = await service.addItem('user-1', 'gift-1');
      expect(giftsService.findById).toHaveBeenCalledWith('gift-1');
      expect(result).toEqual(mockItem);
    });

    it('should throw ConflictException if already in wishlist', async () => {
      repository.findOne.mockResolvedValue(mockItem);
      await expect(service.addItem('user-1', 'gift-1')).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('removeItem', () => {
    it('should remove item from wishlist', async () => {
      repository.findOne.mockResolvedValue(mockItem);
      await service.removeItem('item-1', 'user-1');
      expect(repository.remove).toHaveBeenCalledWith(mockItem);
    });

    it('should throw NotFoundException when item not found', async () => {
      repository.findOne.mockResolvedValue(null);
      await expect(service.removeItem('nonexistent', 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('checkItem', () => {
    it('should return true when item is in wishlist', async () => {
      repository.findOne.mockResolvedValue(mockItem);
      const result = await service.checkItem('user-1', 'gift-1');
      expect(result).toEqual({ inWishlist: true });
    });

    it('should return false when item is not in wishlist', async () => {
      repository.findOne.mockResolvedValue(null);
      const result = await service.checkItem('user-1', 'gift-1');
      expect(result).toEqual({ inWishlist: false });
    });
  });
});
