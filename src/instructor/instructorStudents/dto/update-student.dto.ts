import { PartialType } from '@nestjs/swagger';
import { CreateInstructorStudentDto } from './create-student.dto.js';

export class UpdateInstructorStudentDto extends PartialType(
  CreateInstructorStudentDto,
) {}
