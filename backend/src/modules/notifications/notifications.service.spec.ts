import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { NotificationsService } from './notifications.service.js';
import { Notification } from './notification.entity.js';
import { NotificationType } from '../../common/enums/notification-type.enum.js';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let repository: Record<string, jest.Mock>;

  const mockNotification = {
    id: 'notif-1',
    userId: 'user-1',
    type: NotificationType.GIFT_SENT,
    title: 'Gift Sent',
    message: 'You sent iPhone 15 Pro to Jane',
    read: false,
    createdAt: new Date(),
  };

  beforeEach(async () => {
    repository = {
      find: jest.fn().mockResolvedValue([mockNotification]),
      findOne: jest.fn().mockResolvedValue(mockNotification),
      create: jest.fn().mockReturnValue(mockNotification),
      save: jest.fn().mockResolvedValue(mockNotification),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        { provide: getRepositoryToken(Notification), useValue: repository },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  describe('findByUser', () => {
    it('should return notifications for user', async () => {
      const result = await service.findByUser('user-1');
      expect(result).toEqual([mockNotification]);
      expect(repository.find).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        order: { createdAt: 'DESC' },
      });
    });
  });

  describe('markAsRead', () => {
    it('should mark notification as read', async () => {
      repository.save.mockResolvedValue({ ...mockNotification, read: true });
      const result = await service.markAsRead('notif-1', 'user-1');
      expect(result.read).toBe(true);
    });

    it('should throw NotFoundException when notification not found', async () => {
      repository.findOne.mockResolvedValue(null);
      await expect(
        service.markAsRead('nonexistent', 'user-1'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a notification', async () => {
      const result = await service.create(
        'user-1',
        NotificationType.GIFT_SENT,
        'Gift Sent',
        'You sent a gift',
      );
      expect(repository.create).toHaveBeenCalledWith({
        userId: 'user-1',
        type: NotificationType.GIFT_SENT,
        title: 'Gift Sent',
        message: 'You sent a gift',
      });
      expect(result).toEqual(mockNotification);
    });
  });
});
