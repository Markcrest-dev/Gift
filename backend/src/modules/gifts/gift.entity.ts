import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Category } from '../../common/enums/category.enum.js';
import { Gender } from '../../common/enums/gender.enum.js';

@Entity('gifts')
export class Gift {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column('text')
  description!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column({ default: 'USD' })
  currency!: string;

  @Column({ type: 'enum', enum: Category })
  category!: Category;

  @Column({ type: 'enum', enum: Gender })
  gender!: Gender;

  @Column('decimal', { precision: 2, scale: 1, default: 0 })
  rating!: number;

  @Column({ default: 0 })
  reviews!: number;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  emoji?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
