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
import { StudentLessonService } from './student-lesson.service.js';
import { CreateStudentLessonDto } from './dto/create-student-lesson.dto.js';
import { AuthGuard } from '../../auth/auth.guard.js';
import type { AuthRequest } from '../../auth/auth-request.type.js';

@UseGuards(AuthGuard)
@Controller('student/lessons')
export class StudentLessonController {
  constructor(private readonly service: StudentLessonService) {}

  @Patch(':id/accept')
  accept(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.service.accept(+id, req.user.id);
  }
}
