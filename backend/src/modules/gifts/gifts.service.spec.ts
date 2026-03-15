import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { GiftsService } from './gifts.service.js';
import { Gift } from './gift.entity.js';
import { Category } from '../../common/enums/category.enum.js';

describe('GiftsService', () => {
  let service: GiftsService;

  const mockGift: Partial<Gift> = {
    id: 'gift-1',
    name: 'iPhone 15 Pro',
    description: 'Latest smartphone',
    price: 999,
    currency: 'USD',
    category: Category.ELECTRONICS,
    rating: 5,
    reviews: 234,
  };

  const mockQueryBuilder = {
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue([mockGift]),
  };

  const mockRepository = {
    createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GiftsService,
        { provide: getRepositoryToken(Gift), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<GiftsService>(GiftsService);
    jest.clearAllMocks();
    mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
  });

  describe('findAll', () => {
    it('should return all gifts with no filters', async () => {
      const result = await service.findAll({});
      expect(result).toEqual([mockGift]);
      expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('gift');
    });

    it('should apply search filter', async () => {
      await service.findAll({ search: 'iPhone' });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        '(LOWER(gift.name) LIKE :search OR LOWER(gift.description) LIKE :search)',
        { search: '%iphone%' },
      );
    });

    it('should apply category filter', async () => {
      await service.findAll({ category: Category.ELECTRONICS });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'gift.category = :category',
        { category: Category.ELECTRONICS },
      );
    });

    it('should apply sort by price ascending', async () => {
      await service.findAll({ sort: 'price-asc' });
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        'gift.price',
        'ASC',
      );
    });
  });

  describe('findById', () => {
    it('should return a gift by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockGift);
      const result = await service.findById('gift-1');
      expect(result).toEqual(mockGift);
    });

    it('should throw NotFoundException when gift not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.findById('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
