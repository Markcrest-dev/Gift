import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Redemption } from './redemption.entity.js';
import { CreateRedemptionDto } from './dto/create-redemption.dto.js';
import { OrdersService } from '../orders/orders.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { UsersService } from '../users/users.service.js';
import { OrderStatus } from '../../common/enums/order-status.enum.js';
import { RedemptionMethod } from '../../common/enums/redemption-method.enum.js';
import { RedemptionStatus } from '../../common/enums/redemption-status.enum.js';
import { NotificationType } from '../../common/enums/notification-type.enum.js';

const REQUIRED_FIELDS: Record<RedemptionMethod, readonly string[]> = {
  [RedemptionMethod.PHYSICAL]: ['address', 'city', 'state', 'zipCode', 'country'],
  [RedemptionMethod.CASH]: ['bankName', 'accountNumber', 'routingNumber'],
  [RedemptionMethod.CRYPTO]: ['cryptocurrency', 'walletAddress'],
  [RedemptionMethod.CHARITY]: ['charityName', 'charityId'],
};

@Injectable()
export class RedemptionsService {
  constructor(
    @InjectRepository(Redemption)
    private readonly redemptionsRepository: Repository<Redemption>,
    private readonly ordersService: OrdersService,
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UsersService,
  ) {}

  async create(
    userId: string,
    orderId: string,
    dto: CreateRedemptionDto,
  ): Promise<Redemption> {
    const order = await this.ordersService.findById(orderId);

    const user = await this.usersService.findById(userId);
    if (!user || order.recipientEmail !== user.email) {
      throw new ForbiddenException('You can only redeem gifts sent to you');
    }

    if (order.status === OrderStatus.REDEEMED) {
      throw new BadRequestException('Order has already been redeemed');
    }

    const requiredFields = REQUIRED_FIELDS[dto.method];
    const missingFields = requiredFields.filter(
      (field) => !dto.details[field],
    );
    if (missingFields.length > 0) {
      throw new BadRequestException(
        `Missing required fields for ${dto.method} redemption: ${missingFields.join(', ')}`,
      );
    }

    const redemption = this.redemptionsRepository.create({
      orderId,
      method: dto.method,
      status: RedemptionStatus.PENDING,
      details: dto.details,
    });

    const savedRedemption = await this.redemptionsRepository.save(redemption);

    await this.ordersService.updateStatus(orderId, OrderStatus.REDEEMED);

    await this.notificationsService.create(
      order.senderId,
      NotificationType.REDEMPTION_COMPLETE,
      'Gift Redeemed',
      `${order.recipientName} has redeemed your gift`,
    );

    return savedRedemption;
  }
}
