import { PartialType } from '@nestjs/swagger';
import { CreateStudentLessonDto } from './create-student-lesson.dto.js';

export class UpdateStudentLessonDto extends PartialType(CreateStudentLessonDto) {}
