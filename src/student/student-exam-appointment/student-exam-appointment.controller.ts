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
import { StudentExamAppointmentService } from './student-exam-appointment.service.js';
import { CreateStudentExamAppointmentDto } from './dto/create-student-exam-appointment.dto.js';
import { UpdateStudentExamAppointmentDto } from './dto/update-student-exam-appointment.dto.js';
import { AuthGuard } from '../../auth/auth.guard.js';
import type { AuthRequest } from '../../auth/auth-request.type.js';

@UseGuards(AuthGuard)
@Controller('student/exam-appointments')
export class StudentExamAppointmentController {
  constructor(private readonly service: StudentExamAppointmentService) {}

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.service.findAll(req.user.id);
  }
}
