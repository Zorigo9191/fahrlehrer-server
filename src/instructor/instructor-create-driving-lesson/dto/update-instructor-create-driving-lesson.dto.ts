import { PartialType } from '@nestjs/swagger';
import { CreateInstructorCreateDrivingLessonDto } from './create-instructor-create-driving-lesson.dto.js';

export class UpdateInstructorCreateDrivingLessonDto extends PartialType(CreateInstructorCreateDrivingLessonDto) {}
