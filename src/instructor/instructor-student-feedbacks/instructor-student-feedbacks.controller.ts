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
import { InstructorStudentFeedbacksService } from './instructor-student-feedbacks.service.js';
import { CreateInstructorStudentFeedbackDto } from './dto/create-instructor-student-feedback.dto.js';
import { UpdateInstructorStudentFeedbackDto } from './dto/update-instructor-student-feedback.dto.js';
import { AuthGuard } from '../../auth/auth.guard.js';
import { User } from '@supabase/supabase-js';

type AuthRequest = Request & { user: User };

@UseGuards(AuthGuard)
@Controller('student/:studentId/feedback')
export class InstructorStudentFeedbacksController {
  constructor(private readonly service: InstructorStudentFeedbacksService) {}

  @Post()
  create(
    @Param('studentId') studentId: string,
    @Body() dto: CreateInstructorStudentFeedbackDto,
    @Req() req: AuthRequest,
  ) {
    return this.service.create(studentId, dto, req.user.id);
  }

  @Get()
  findAll(@Param('studentId') studentId: string, @Req() req: AuthRequest) {
    return this.service.findAll(studentId, req.user.id);
  }

  @Get(':id')
  findOne(
    @Param('studentId') studentId: string,
    @Param('id') id: string,
    @Req() req: AuthRequest,
  ) {
    return this.service.findOne(studentId, +id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('studentId') studentId: string,
    @Param('id') id: string,
    @Body() dto: UpdateInstructorStudentFeedbackDto,
    @Req() req: AuthRequest,
  ) {
    return this.service.update(studentId, +id, dto, req.user.id);
  }

  @Delete(':id')
  remove(
    @Param('studentId') studentId: string,
    @Param('id') id: string,
    @Req() req: AuthRequest,
  ) {
    return this.service.remove(studentId, +id, req.user.id);
  }
}
