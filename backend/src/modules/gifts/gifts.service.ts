import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gift } from './gift.entity.js';
import { FilterGiftsDto } from './dto/filter-gifts.dto.js';
import { Gender } from '../../common/enums/gender.enum.js';

@Injectable()
export class GiftsService {
  constructor(
    @InjectRepository(Gift)
    private readonly giftsRepository: Repository<Gift>,
  ) {}

  async findAll(filters: FilterGiftsDto): Promise<Gift[]> {
    const qb = this.giftsRepository.createQueryBuilder('gift');

    if (filters.search) {
      qb.andWhere(
        '(LOWER(gift.name) LIKE :search OR LOWER(gift.description) LIKE :search)',
        { search: `%${filters.search.toLowerCase()}%` },
      );
    }

    if (filters.category) {
      qb.andWhere('gift.category = :category', {
        category: filters.category,
      });
    }

    if (filters.gender) {
      qb.andWhere('(gift.gender = :gender OR gift.gender = :unisex)', {
        gender: filters.gender,
        unisex: Gender.UNISEX,
      });
    }

    if (filters.minPrice !== undefined) {
      qb.andWhere('gift.price >= :minPrice', { minPrice: filters.minPrice });
    }

    if (filters.maxPrice !== undefined) {
      qb.andWhere('gift.price <= :maxPrice', { maxPrice: filters.maxPrice });
    }

    if (filters.minRating !== undefined) {
      qb.andWhere('gift.rating >= :minRating', {
        minRating: filters.minRating,
      });
    }

    switch (filters.sort) {
      case 'price-asc':
        qb.orderBy('gift.price', 'ASC');
        break;
      case 'price-desc':
        qb.orderBy('gift.price', 'DESC');
        break;
      case 'rating':
        qb.orderBy('gift.rating', 'DESC');
        break;
      case 'newest':
        qb.orderBy('gift.createdAt', 'DESC');
        break;
      default:
        qb.orderBy('gift.createdAt', 'DESC');
        break;
    }

    return qb.getMany();
  }

  async findById(id: string): Promise<Gift> {
    const gift = await this.giftsRepository.findOne({ where: { id } });
    if (!gift) {
      throw new NotFoundException('Gift not found');
    }
    return gift;
  }
}
