import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { GiftsService } from '../gifts/gifts.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { SERVICE_FEE_RATE } from '../../common/constants.js';
import { OrderStatus } from '../../common/enums/order-status.enum.js';
import { NotificationType } from '../../common/enums/notification-type.enum.js';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly giftsService: GiftsService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(senderId: string, dto: CreateOrderDto): Promise<Order> {
    const gift = await this.giftsService.findById(dto.giftId);
    const serviceFee = Number((gift.price * SERVICE_FEE_RATE).toFixed(2));
    const totalAmount = Number((gift.price + serviceFee).toFixed(2));

    const order = this.ordersRepository.create({
      senderId,
      recipientEmail: dto.recipientEmail,
      recipientName: dto.recipientName,
      giftId: dto.giftId,
      message: dto.message,
      deliveryDate: dto.deliveryDate ? new Date(dto.deliveryDate) : undefined,
      anonymous: dto.anonymous ?? false,
      paymentMethod: dto.paymentMethod,
      status: OrderStatus.SENT,
      serviceFee,
      totalAmount,
    });

    const savedOrder = await this.ordersRepository.save(order);

    await this.notificationsService.create(
      senderId,
      NotificationType.GIFT_SENT,
      'Gift Sent',
      `You sent ${gift.name} to ${dto.recipientName}`,
    );

    return this.ordersRepository.findOneOrFail({
      where: { id: savedOrder.id },
    });
  }

  async findSentOrders(senderId: string): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { senderId },
      order: { createdAt: 'DESC' },
    });
  }

  async findReceivedOrders(recipientEmail: string): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { recipientEmail },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    await this.ordersRepository.update(id, { status });
    return this.findById(id);
  }
}
