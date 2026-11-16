import { PartialType } from '@nestjs/swagger';
import { CreateStudentFeedbackDto } from './create-student-feedback.dto.js';

export class UpdateStudentFeedbackDto extends PartialType(CreateStudentFeedbackDto) {}
