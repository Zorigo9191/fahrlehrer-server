import { PartialType } from '@nestjs/mapped-types';
import { CreateOfficeExamSlotDto } from './create-office-exam-slot.dto.js';

export class UpdateOfficeExamSlotDto extends PartialType(
  CreateOfficeExamSlotDto,
) {}
