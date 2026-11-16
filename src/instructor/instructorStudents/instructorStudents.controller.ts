import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';

import { UpdateInstructorStudentDto } from './dto/update-student.dto.js';
import { CreateInstructorStudentDto } from './dto/create-student.dto.js';
import { instructorStudentsService } from './instructorStudents.service.js';
import { AuthGuard } from '../../auth/auth.guard.js';
import type { AuthRequest } from '../../auth/auth-request.type.js';
import { Roles } from '../../auth/roles.decorator.js';

@UseGuards(AuthGuard)
@Roles('instructor')
@Controller('students')
export class instructorStudentsController {
  constructor(private readonly studentsService: instructorStudentsService) {}

  @Post('createStudent')
  create(
    @Body() createStudentDto: CreateInstructorStudentDto,
    @Req() req: AuthRequest,
  ) {
    return this.studentsService.create(createStudentDto, req.user.id);
  }

  @Get('instructorStudents')
  findAll(@Req() req: AuthRequest) {
    return this.studentsService.findAll(req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateInstructorStudentDto,
    @Req() req: AuthRequest,
  ) {
    return this.studentsService.update(id, updateStudentDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') studentId: string, @Req() req: AuthRequest) {
    return this.studentsService.remove(studentId, req.user.id);
  }
}
