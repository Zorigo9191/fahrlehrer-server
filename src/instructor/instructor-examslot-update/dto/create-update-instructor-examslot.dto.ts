import { IsString } from 'class-validator';

export class CreateUpdateInstructorExamslotDto {
  @IsString()
  student_name: string;

  @IsString()
  student_id: string;

  @IsString()
  student_appointment: string;

  @IsString()
  license_class: string;

  @IsString()
  instructor_name: string;
}
