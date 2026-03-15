import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gift } from '../../modules/gifts/gift.entity.js';
import { Category } from '../../common/enums/category.enum.js';
import { Gender } from '../../common/enums/gender.enum.js';

const GIFT_CATALOG: Partial<Gift>[] = [
  {
    name: 'iPhone 15 Pro',
    description: 'Latest flagship smartphone with advanced camera system',
    price: 999,
    currency: 'USD',
    category: Category.ELECTRONICS,
    gender: Gender.UNISEX,
    rating: 5,
    reviews: 234,
  },
  {
    name: 'AirPods Pro',
    description: 'Premium wireless earbuds with active noise cancellation',
    price: 249,
    currency: 'USD',
    category: Category.ELECTRONICS,
    gender: Gender.UNISEX,
    rating: 5,
    reviews: 512,
  },
  {
    name: 'Designer Handbag',
    description: 'Luxury leather handbag for the fashion-forward',
    price: 599,
    currency: 'USD',
    category: Category.FASHION,
    gender: Gender.FEMALE,
    rating: 4,
    reviews: 89,
  },
  {
    name: 'LEGO Boost Kit',
    description: 'Creative robotics building set for kids',
    price: 159,
    currency: 'USD',
    category: Category.TOYS,
    gender: Gender.UNISEX,
    rating: 5,
    reviews: 156,
  },
  {
    name: 'Spa Day Package',
    description: 'Relaxing full-day spa experience',
    price: 299,
    currency: 'USD',
    category: Category.EXPERIENCES,
    gender: Gender.FEMALE,
    rating: 5,
    reviews: 203,
  },
  {
    name: 'Amazon Gift Card',
    description: 'Digital gift card for endless shopping',
    price: 100,
    currency: 'USD',
    category: Category.GIFT_CARDS,
    gender: Gender.UNISEX,
    rating: 5,
    reviews: 1024,
  },
  {
    name: 'Apple Watch',
    description: 'Smart watch with health and fitness tracking',
    price: 399,
    currency: 'USD',
    category: Category.ELECTRONICS,
    gender: Gender.UNISEX,
    rating: 5,
    reviews: 345,
  },
  {
    name: 'Perfume Set',
    description: 'Premium fragrance collection',
    price: 129,
    currency: 'USD',
    category: Category.FASHION,
    gender: Gender.FEMALE,
    rating: 4,
    reviews: 78,
  },
  {
    name: 'Gaming Headset',
    description: 'Professional gaming headset with RGB lighting',
    price: 159,
    currency: 'USD',
    category: Category.ELECTRONICS,
    gender: Gender.MALE,
    rating: 5,
    reviews: 456,
  },
  {
    name: 'Yoga Mat Set',
    description: 'Premium yoga mat with accessories',
    price: 89,
    currency: 'USD',
    category: Category.HOME,
    gender: Gender.FEMALE,
    rating: 4,
    reviews: 234,
  },
];

@Injectable()
export class GiftSeedService {
  constructor(
    @InjectRepository(Gift)
    private readonly giftsRepository: Repository<Gift>,
  ) {}

  async seed(): Promise<void> {
    const count = await this.giftsRepository.count();
    if (count > 0) {
      console.log('Gifts already seeded, skipping...');
      return;
    }

    for (const giftData of GIFT_CATALOG) {
      const gift = this.giftsRepository.create(giftData);
      await this.giftsRepository.save(gift);
    }

    console.log(`Seeded ${GIFT_CATALOG.length} gifts`);
  }
}
