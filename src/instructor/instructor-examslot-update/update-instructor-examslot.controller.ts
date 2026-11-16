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
import { UpdateInstructorExamslotService } from './update-instructor-examslot.service.js';

import { AuthGuard } from '../../auth/auth.guard.js';
import type { AuthRequest } from '../../auth/auth-request.type.js';
import { UpdateInstructorExamslotDto } from './dto/update-update-instructor-examslot.dto.js';
import { Roles } from '../../auth/roles.decorator.js';
import { RolesGuard } from '../../auth/roles.guard.js';

@UseGuards(AuthGuard, RolesGuard)
@Roles('instructor')
@Controller('instructor/exam-slots')
export class UpdateInstructorExamslotController {
  constructor(private readonly service: UpdateInstructorExamslotService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateInstructorExamslotDto,
    @Req() req: AuthRequest,
  ) {
    return this.service.update(id, dto, req.user.id);
  }
}
