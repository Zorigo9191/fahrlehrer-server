import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateOfficeInstructorAccountDto } from './create-office-instructor-account.dto.js';

export class UpdateOfficeInstructorAccountDto extends PartialType(
  OmitType(CreateOfficeInstructorAccountDto, ['email', 'password'] as const),
) {}
