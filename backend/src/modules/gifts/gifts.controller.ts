import { Controller, Get, Param, Query } from '@nestjs/common';
import { GiftsService } from './gifts.service.js';
import { FilterGiftsDto } from './dto/filter-gifts.dto.js';

@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @Get()
  findAll(@Query() filters: FilterGiftsDto) {
    return this.giftsService.findAll(filters);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.giftsService.findById(id);
  }
}
