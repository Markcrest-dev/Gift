import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from '../users/user.entity.js';
import { Gift } from '../gifts/gift.entity.js';

@Entity('wishlist_items')
@Unique(['userId', 'giftId'])
export class WishlistItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  giftId!: string;

  @ManyToOne(() => Gift, { eager: true })
  @JoinColumn({ name: 'giftId' })
  gift!: Gift;

  @CreateDateColumn()
  addedAt!: Date;
}
