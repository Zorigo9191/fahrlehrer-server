import { PartialType } from '@nestjs/swagger';
import { CreateInstructorStudentFeedbackDto } from './create-instructor-student-feedback.dto.js';

export class UpdateInstructorStudentFeedbackDto extends PartialType(CreateInstructorStudentFeedbackDto) {}
