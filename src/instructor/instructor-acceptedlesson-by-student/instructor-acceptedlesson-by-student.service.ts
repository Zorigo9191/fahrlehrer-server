import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateInstructorAcceptedlessonByStudentDto } from './dto/create-instructor-acceptedlesson-by-student.dto.js';
import { UpdateInstructorAcceptedlessonByStudentDto } from './dto/update-instructor-acceptedlesson-by-student.dto.js';
import { SUPABASE } from '../../supabase/supabase.provider.js';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class InstructorAcceptedlessonByStudentService {
  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {}

  create(dto: CreateInstructorAcceptedlessonByStudentDto) {
    return 'This action adds a new instructorAcceptedlessonByStudent';
  }

  async findAll(instructorId: string) {
    const { data, error } = await this.supabase
      .from('available_lessons')
      .select(
        '*, driving_students!available_lessons_student_id_fkey(full_name, id)',
      )
      .eq('instructor_id', instructorId)
      .eq('status', 'vergeben');

    if (error) throw new InternalServerErrorException(error.message);

    return data;
  }



  async update(
    lessonId: number,
    dto: UpdateInstructorAcceptedlessonByStudentDto,
    instructorId: string,
  ) {
    const { data: lesson, error: updateError } = await this.supabase
      .from('available_lessons')
      .update({
        lesson_date: dto.lesson_date,
        lesson_time: dto.lesson_time,
        duration_minutes: dto.duration_minutes,
        license_class: dto.license_class,
      })
      .eq('id', lessonId)
      .eq('instructor_id', instructorId)
      .select('*, driving_students(*)')
      .single();

    if (updateError)
      throw new InternalServerErrorException(updateError.message);

    return lesson;
  }


}
