import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateOfficeExamDayDto {
  @IsString()
  exam_date: string;

  @IsString()
  license_class: string;

  @IsInt()
  @Min(1)
  @Max(8)
  slots: number;
}
