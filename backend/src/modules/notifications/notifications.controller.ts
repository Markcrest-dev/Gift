import { Controller, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
  ) {}

  @Get()
  findAll(@CurrentUser() user: { id: string }) {
    return this.notificationsService.findByUser(user.id);
  }

  @Patch(':id/read')
  markAsRead(
    @CurrentUser() user: { id: string },
    @Param('id') id: string,
  ) {
    return this.notificationsService.markAsRead(id, user.id);
  }
}
