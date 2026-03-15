import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity.js';
import { NotificationType } from '../../common/enums/notification-type.enum.js';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
  ) {}

  async findByUser(userId: string): Promise<Notification[]> {
    return this.notificationsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: string, userId: string): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({
      where: { id, userId },
    });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    notification.read = true;
    return this.notificationsRepository.save(notification);
  }

  async create(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
  ): Promise<Notification> {
    const notification = this.notificationsRepository.create({
      userId,
      type,
      title,
      message,
    });
    return this.notificationsRepository.save(notification);
  }
}
