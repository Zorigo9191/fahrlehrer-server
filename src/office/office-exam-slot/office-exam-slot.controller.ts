import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OfficeExamSlotService } from './office-exam-slot.service.js';
import { CreateOfficeExamSlotDto } from './dto/create-office-exam-slot.dto.js';
import { UpdateOfficeExamSlotDto } from './dto/update-office-exam-slot.dto.js';
import type { AuthRequest } from '../../auth/auth-request.type.js';
import { Roles } from '../../auth/roles.decorator.js';
import { AuthGuard } from '../../auth/auth.guard.js';
import { RolesGuard } from '../../auth/roles.guard.js';

@UseGuards(AuthGuard, RolesGuard)
@Roles('office')
@Controller('office/exam-slots')
export class OfficeExamSlotController {
  constructor(private readonly officeExamSlotService: OfficeExamSlotService) {}

  @Patch(':id/status')
  updateSlotStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOfficeExamSlotDto,
  ) {
    return this.officeExamSlotService.updateSlotStatus(id, dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOfficeExamSlotDto) {
    return this.officeExamSlotService.update(id, dto);
  }
}
