import { PartialType } from '@nestjs/swagger';
import { CreateStudentExamAppointmentDto } from './create-student-exam-appointment.dto.js';

export class UpdateStudentExamAppointmentDto extends PartialType(CreateStudentExamAppointmentDto) {}
