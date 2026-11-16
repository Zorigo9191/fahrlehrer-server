import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OfficeExamDaysService } from './office-exam-days.service.js';
import { CreateOfficeExamDayDto } from './dto/create-office-exam-day.dto.js';
import { UpdateOfficeExamDayDto } from './dto/update-office-exam-day.dto.js';
import { AuthGuard } from '../../auth/auth.guard.js';
import { Roles } from '../../auth/roles.decorator.js';
import { RolesGuard } from '../../auth/roles.guard.js';
import type { AuthRequest } from '../../auth/auth-request.type.js';
import { CreateOfficeExamSlotDto } from './dto/create-office-exam-slot.dto.js';

@UseGuards(AuthGuard, RolesGuard)
@Roles('office')
@Controller('office/exam-days')
export class OfficeExamDaysController {
  constructor(private readonly service: OfficeExamDaysService) {}

  @Post()
  create(@Req() req: AuthRequest, @Body() dto: CreateOfficeExamDayDto) {
    return this.service.createNewDate(dto, req.user.id);
  }

  @Post('slot')
  createNewSlot(@Body() dto: CreateOfficeExamSlotDto) {
    return this.service.createNewSlot(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOfficeExamDayDto) {
    return this.service.update(id, dto);
  }

  @Delete('delete-slot/:slotId')
  removeExamSlot(@Param('slotId') slotId: string) {
    return this.service.removeExamSlot(slotId);
  }

  @Delete(':dayId')
  removeExamDay(@Param('dayId') dayId: string) {
    return this.service.removeExamDay(dayId);
  }
}
