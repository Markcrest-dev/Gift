import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../orders/order.entity.js';
import { RedemptionMethod } from '../../common/enums/redemption-method.enum.js';
import { RedemptionStatus } from '../../common/enums/redemption-status.enum.js';

@Entity('redemptions')
export class Redemption {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  orderId!: string;

  @OneToOne(() => Order)
  @JoinColumn({ name: 'orderId' })
  order!: Order;

  @Column({ type: 'enum', enum: RedemptionMethod })
  method!: RedemptionMethod;

  @Column({
    type: 'enum',
    enum: RedemptionStatus,
    default: RedemptionStatus.PENDING,
  })
  status!: RedemptionStatus;

  @Column('jsonb')
  details!: Record<string, string>;

  @Column({ type: 'timestamp', nullable: true })
  completedAt?: Date;
}
