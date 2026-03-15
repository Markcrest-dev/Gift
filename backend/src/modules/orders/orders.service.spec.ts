import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { Order } from './order.entity.js';
import { GiftsService } from '../gifts/gifts.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { PaymentMethod } from '../../common/enums/payment-method.enum.js';
import { OrderStatus } from '../../common/enums/order-status.enum.js';
import { Category } from '../../common/enums/category.enum.js';
import { Gender } from '../../common/enums/gender.enum.js';

describe('OrdersService', () => {
  let service: OrdersService;
  let ordersRepository: Record<string, jest.Mock>;
  let giftsService: Record<string, jest.Mock>;
  let notificationsService: Record<string, jest.Mock>;

  const mockGift = {
    id: 'gift-1',
    name: 'iPhone 15 Pro',
    price: 999,
    currency: 'USD',
    category: Category.ELECTRONICS,
    gender: Gender.UNISEX,
    rating: 5,
    reviews: 234,
    createdAt: new Date(),
  };

  const mockOrder = {
    id: 'order-1',
    senderId: 'user-1',
    recipientEmail: 'recipient@example.com',
    recipientName: 'Jane',
    giftId: 'gift-1',
    gift: mockGift,
    message: 'Happy birthday!',
    anonymous: false,
    status: OrderStatus.SENT,
    paymentMethod: PaymentMethod.CARD,
    totalAmount: 1048.95,
    serviceFee: 49.95,
    createdAt: new Date(),
  };

  beforeEach(async () => {
    ordersRepository = {
      create: jest.fn().mockReturnValue(mockOrder),
      save: jest.fn().mockResolvedValue(mockOrder),
      find: jest.fn().mockResolvedValue([mockOrder]),
      findOne: jest.fn().mockResolvedValue(mockOrder),
      findOneOrFail: jest.fn().mockResolvedValue(mockOrder),
      update: jest.fn().mockResolvedValue({ affected: 1 }),
    };

    giftsService = {
      findById: jest.fn().mockResolvedValue(mockGift),
    };

    notificationsService = {
      create: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: getRepositoryToken(Order), useValue: ordersRepository },
        { provide: GiftsService, useValue: giftsService },
        { provide: NotificationsService, useValue: notificationsService },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  describe('create', () => {
    it('should create an order with calculated fees', async () => {
      const result = await service.create('user-1', {
        recipientEmail: 'recipient@example.com',
        recipientName: 'Jane',
        giftId: 'gift-1',
        message: 'Happy birthday!',
        paymentMethod: PaymentMethod.CARD,
      });

      expect(giftsService.findById).toHaveBeenCalledWith('gift-1');
      expect(ordersRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          senderId: 'user-1',
          serviceFee: 49.95,
          totalAmount: 1048.95,
          status: OrderStatus.SENT,
        }),
      );
      expect(notificationsService.create).toHaveBeenCalled();
      expect(result).toEqual(mockOrder);
    });
  });

  describe('findSentOrders', () => {
    it('should return orders sent by user', async () => {
      const result = await service.findSentOrders('user-1');
      expect(ordersRepository.find).toHaveBeenCalledWith({
        where: { senderId: 'user-1' },
        order: { createdAt: 'DESC' },
      });
      expect(result).toEqual([mockOrder]);
    });
  });

  describe('findReceivedOrders', () => {
    it('should return orders received by email', async () => {
      const result = await service.findReceivedOrders('recipient@example.com');
      expect(ordersRepository.find).toHaveBeenCalledWith({
        where: { recipientEmail: 'recipient@example.com' },
        order: { createdAt: 'DESC' },
      });
      expect(result).toEqual([mockOrder]);
    });
  });

  describe('findById', () => {
    it('should throw NotFoundException when order not found', async () => {
      ordersRepository.findOne.mockResolvedValue(null);
      await expect(service.findById('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
