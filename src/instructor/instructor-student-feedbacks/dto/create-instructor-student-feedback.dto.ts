import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInstructorStudentFeedbackDto {
  @IsString() @IsNotEmpty() feedback: string;
  @IsString() @IsNotEmpty() license_class: string;
  // @IsString() @IsNotEmpty() student_id: string;
  @IsString() @IsNotEmpty() created_at: string;
}
