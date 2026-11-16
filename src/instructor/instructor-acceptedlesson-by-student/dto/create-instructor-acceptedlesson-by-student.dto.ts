import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInstructorAcceptedlessonByStudentDto {
  @IsOptional()
  @IsNumber()
  duration_minutes?: number;

  @IsString()
  lesson_date: string;

  @IsString()
  lesson_time: string;

  @IsString()
  license_class: string;
}
