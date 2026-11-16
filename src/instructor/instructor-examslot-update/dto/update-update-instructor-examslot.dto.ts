import { PartialType } from '@nestjs/swagger';
import { CreateUpdateInstructorExamslotDto } from './create-update-instructor-examslot.dto.js';

export class UpdateInstructorExamslotDto extends PartialType(
  CreateUpdateInstructorExamslotDto,
) {}
