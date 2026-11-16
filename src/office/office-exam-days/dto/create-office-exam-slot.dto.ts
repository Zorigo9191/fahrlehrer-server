import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateOfficeExamSlotDto {
  @IsOptional()
  @IsString()
  created_at?: string;

  @IsNotEmpty()
  @IsString()
  exam_day_id: string;

  @IsNotEmpty()
  @IsString()
  exam_time: string;

  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  instructor_name?: string | null;

  @IsOptional()
  @IsString()
  license_class?: string | null;

  @IsOptional()
  @IsString()
  notes?: string | null;

  @IsOptional()
  @IsString()
  status?: string | null;

  @IsOptional()
  @IsString()
  student_appointment?: string | null;

  @IsOptional()
  @IsString()
  student_id?: string | null;

  @IsOptional()
  @IsString()
  student_name?: string | null;
}
