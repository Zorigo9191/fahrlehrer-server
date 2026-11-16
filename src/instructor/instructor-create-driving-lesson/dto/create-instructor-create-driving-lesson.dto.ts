import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInstructorCreateDrivingLessonDto {
  @IsOptional()
  @IsNumber()
  duration_minutes?: number;

  @IsString()
  lesson_date: string;

  @IsString()
  lesson_time: string;

  @IsString()
  license_class: string;

  @IsOptional()
  @IsBoolean()
  read_at?: boolean;

  @IsOptional()
  @IsString()
  status?: string;
}
