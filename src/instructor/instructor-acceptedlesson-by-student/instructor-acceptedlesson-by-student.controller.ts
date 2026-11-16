import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { InstructorAcceptedlessonByStudentService } from './instructor-acceptedlesson-by-student.service.js';
import { CreateInstructorAcceptedlessonByStudentDto } from './dto/create-instructor-acceptedlesson-by-student.dto.js';
import { UpdateInstructorAcceptedlessonByStudentDto } from './dto/update-instructor-acceptedlesson-by-student.dto.js';
import { AuthGuard } from '../../auth/auth.guard.js';
import type { AuthRequest } from '../../auth/auth-request.type.js';

@UseGuards(AuthGuard)
@Controller('instructor/acceptedlesson')
export class InstructorAcceptedlessonByStudentController {
  constructor(
    private readonly service: InstructorAcceptedlessonByStudentService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateInstructorAcceptedlessonByStudentDto,
  ) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.service.findAll(req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: AuthRequest,
    @Body() dto: UpdateInstructorAcceptedlessonByStudentDto,
  ) {
    return this.service.update(+id, dto, req.user.id);
  }
}
