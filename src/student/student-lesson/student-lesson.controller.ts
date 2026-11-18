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
  Query,
} from '@nestjs/common';
import { StudentLessonService } from './student-lesson.service.js';
import { CreateStudentLessonDto } from './dto/create-student-lesson.dto.js';
import { AuthGuard } from '../../auth/auth.guard.js';
import type { AuthRequest } from '../../auth/auth-request.type.js';

@UseGuards(AuthGuard)
@Controller('student/lessons')
export class StudentLessonController {
  constructor(private readonly service: StudentLessonService) {}

  @Get()
  findAll(
    @Query('instructorIds') instructorIdsParam?: string,
    @Query('studentLicenseClass') licenseClassParam?: string,
  ) {
    const instructorIds = instructorIdsParam
      ? instructorIdsParam.split(',')
      : [];

    const studentLicenseClass = licenseClassParam
      ? licenseClassParam.split(',')
      : undefined;

    return this.service.findAll({
      instructorIds,
      studentLicenseClass,
    });
  }

  @Patch(':id/accept')
  accept(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.service.accept(+id, req.user.id);
  }
}
