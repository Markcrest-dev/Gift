import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '../../config/database.config.js';
import { Gift } from '../../modules/gifts/gift.entity.js';
import { GiftSeedService } from './gift-seed.service.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(databaseConfig),
    TypeOrmModule.forFeature([Gift]),
  ],
  providers: [GiftSeedService],
})
export class SeedModule {}
