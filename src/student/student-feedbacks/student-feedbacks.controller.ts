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
import { StudentFeedbacksService } from './student-feedbacks.service.js';
import { CreateStudentFeedbackDto } from './dto/create-student-feedback.dto.js';
import { UpdateStudentFeedbackDto } from './dto/update-student-feedback.dto.js';
import { AuthGuard } from '../../auth/auth.guard.js';
import type { AuthRequest } from '../../auth/auth-request.type.js';
import { Roles } from '../../auth/roles.decorator.js';
import { RolesGuard } from '../../auth/roles.guard.js';

@UseGuards(AuthGuard, RolesGuard)
@Roles('student', 'instructor')
@Controller('student/feedbacks')
export class StudentFeedbacksController {
  constructor(private readonly service: StudentFeedbacksService) {}

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.service.findAll(req.user.id, req.role!);
  }
}
