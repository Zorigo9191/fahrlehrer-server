import { IsOptional, IsString } from 'class-validator';

export class CreateOfficeExamSlotDto {
  @IsString()
  student_id: string;

  @IsString()
  student_name: string;

  @IsString()
  student_appointment: string;

  @IsString()
  license_class: string;

  @IsString()
  instructor_name: string;

  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsString() notes?: string | null;
}
