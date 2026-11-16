import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { InstructorCreateDrivingLessonService } from './instructor-create-driving-lesson.service.js';
import { CreateInstructorCreateDrivingLessonDto } from './dto/create-instructor-create-driving-lesson.dto.js';
import { UpdateInstructorCreateDrivingLessonDto } from './dto/update-instructor-create-driving-lesson.dto.js';
import { AuthGuard } from '../../auth/auth.guard.js';
import type { AuthRequest } from '../../auth/auth-request.type.js';

@UseGuards(AuthGuard)
@Controller('instructor/lessons')
export class InstructorCreateDrivingLessonController {
  constructor(private readonly service: InstructorCreateDrivingLessonService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() dto: CreateInstructorCreateDrivingLessonDto,
    @Req() req: AuthRequest,
  ) {
    return this.service.create(dto, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateInstructorCreateDrivingLessonDto,
    @Req() req: AuthRequest,
  ) {
    return this.service.update(+id, dto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.service.remove(+id, req.user.id);
  }
}
