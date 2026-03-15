import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity.js';
import { Gift } from '../gifts/gift.entity.js';
import { OrderStatus } from '../../common/enums/order-status.enum.js';
import { PaymentMethod } from '../../common/enums/payment-method.enum.js';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  senderId!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'senderId' })
  sender!: User;

  @Column()
  recipientEmail!: string;

  @Column()
  recipientName!: string;

  @Column()
  giftId!: string;

  @ManyToOne(() => Gift, { eager: true })
  @JoinColumn({ name: 'giftId' })
  gift!: Gift;

  @Column('text')
  message!: string;

  @Column({ type: 'timestamp', nullable: true })
  deliveryDate?: Date;

  @Column({ default: false })
  anonymous!: boolean;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status!: OrderStatus;

  @Column({ type: 'enum', enum: PaymentMethod })
  paymentMethod!: PaymentMethod;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  serviceFee!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
