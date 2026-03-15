import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { RedemptionsService } from './redemptions.service.js';
import { Redemption } from './redemption.entity.js';
import { OrdersService } from '../orders/orders.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { UsersService } from '../users/users.service.js';
import { RedemptionMethod } from '../../common/enums/redemption-method.enum.js';
import { OrderStatus } from '../../common/enums/order-status.enum.js';
import { PaymentMethod } from '../../common/enums/payment-method.enum.js';

describe('RedemptionsService', () => {
  let service: RedemptionsService;
  let redemptionsRepository: Record<string, jest.Mock>;
  let ordersService: Record<string, jest.Mock>;
  let notificationsService: Record<string, jest.Mock>;
  let usersService: Record<string, jest.Mock>;

  const mockOrder = {
    id: 'order-1',
    senderId: 'sender-1',
    recipientEmail: 'recipient@example.com',
    recipientName: 'Jane',
    giftId: 'gift-1',
    status: OrderStatus.SENT,
    paymentMethod: PaymentMethod.CARD,
    totalAmount: 1048.95,
    serviceFee: 49.95,
    createdAt: new Date(),
  };

  const mockUser = {
    id: 'user-1',
    email: 'recipient@example.com',
    firstName: 'Jane',
    lastName: 'Doe',
    createdAt: new Date(),
  };

  const mockRedemption = {
    id: 'redemption-1',
    orderId: 'order-1',
    method: RedemptionMethod.PHYSICAL,
    status: 'pending',
    details: {
      address: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      country: 'US',
    },
  };

  beforeEach(async () => {
    redemptionsRepository = {
      create: jest.fn().mockReturnValue(mockRedemption),
      save: jest.fn().mockResolvedValue(mockRedemption),
    };

    ordersService = {
      findById: jest.fn().mockResolvedValue(mockOrder),
      updateStatus: jest.fn().mockResolvedValue(undefined),
    };

    notificationsService = {
      create: jest.fn().mockResolvedValue(undefined),
    };

    usersService = {
      findById: jest.fn().mockResolvedValue(mockUser),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedemptionsService,
        {
          provide: getRepositoryToken(Redemption),
          useValue: redemptionsRepository,
        },
        { provide: OrdersService, useValue: ordersService },
        { provide: NotificationsService, useValue: notificationsService },
        { provide: UsersService, useValue: usersService },
      ],
    }).compile();

    service = module.get<RedemptionsService>(RedemptionsService);
  });

  describe('create', () => {
    it('should create a redemption and update order status', async () => {
      const result = await service.create('user-1', 'order-1', {
        method: RedemptionMethod.PHYSICAL,
        details: {
          address: '123 Main St',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62701',
          country: 'US',
        },
      });

      expect(result).toEqual(mockRedemption);
      expect(ordersService.updateStatus).toHaveBeenCalledWith(
        'order-1',
        OrderStatus.REDEEMED,
      );
      expect(notificationsService.create).toHaveBeenCalled();
    });

    it('should throw ForbiddenException if user is not the recipient', async () => {
      usersService.findById.mockResolvedValue({
        ...mockUser,
        email: 'other@example.com',
      });

      await expect(
        service.create('user-1', 'order-1', {
          method: RedemptionMethod.PHYSICAL,
          details: {
            address: '123 Main St',
            city: 'Springfield',
            state: 'IL',
            zipCode: '62701',
            country: 'US',
          },
        }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw BadRequestException if order already redeemed', async () => {
      ordersService.findById.mockResolvedValue({
        ...mockOrder,
        status: OrderStatus.REDEEMED,
      });

      await expect(
        service.create('user-1', 'order-1', {
          method: RedemptionMethod.PHYSICAL,
          details: {
            address: '123 Main St',
            city: 'Springfield',
            state: 'IL',
            zipCode: '62701',
            country: 'US',
          },
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for missing required fields', async () => {
      await expect(
        service.create('user-1', 'order-1', {
          method: RedemptionMethod.PHYSICAL,
          details: { address: '123 Main St' },
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
