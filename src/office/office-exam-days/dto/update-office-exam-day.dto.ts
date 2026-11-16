import { PartialType } from '@nestjs/mapped-types';
import { CreateOfficeExamDayDto } from './create-office-exam-day.dto.js';

export class UpdateOfficeExamDayDto extends PartialType(
  CreateOfficeExamDayDto,
) {}
