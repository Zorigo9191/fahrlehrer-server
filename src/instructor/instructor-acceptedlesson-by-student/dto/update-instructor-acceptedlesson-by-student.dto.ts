import { PartialType } from '@nestjs/swagger';
import { CreateInstructorAcceptedlessonByStudentDto } from './create-instructor-acceptedlesson-by-student.dto.js';

export class UpdateInstructorAcceptedlessonByStudentDto extends PartialType(CreateInstructorAcceptedlessonByStudentDto) {}
