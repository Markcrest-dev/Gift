import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gift } from './gift.entity.js';
import { GiftsService } from './gifts.service.js';
import { GiftsController } from './gifts.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Gift])],
  controllers: [GiftsController],
  providers: [GiftsService],
  exports: [GiftsService],
})
export class GiftsModule {}
