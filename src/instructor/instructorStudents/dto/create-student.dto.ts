import { IsArray, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateInstructorStudentDto {
  @IsString()
  full_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsArray()
  @IsString({ each: true })
  license_classes: string[];
}
