import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateInstructorCreateDrivingLessonDto } from './dto/create-instructor-create-driving-lesson.dto.js';
import { UpdateInstructorCreateDrivingLessonDto } from './dto/update-instructor-create-driving-lesson.dto.js';
import { SUPABASE } from '../../supabase/supabase.provider.js';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class InstructorCreateDrivingLessonService {
  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {}

  async create(
    dto: CreateInstructorCreateDrivingLessonDto,
    instructorId: string,
  ) {
    const { data: createdLesson, error: createError } = await this.supabase
      .from('available_lessons')
      .insert({ ...dto, instructor_id: instructorId })
      .select();

    if (createError)
      throw new InternalServerErrorException(createError.message);

    return createdLesson;
  }

  async update(
    lessonId: number,
    dto: UpdateInstructorCreateDrivingLessonDto,
    instructorId: string,
  ) {
    const { data: updatedLesson, error: updateError } = await this.supabase
      .from('available_lessons')
      .update(dto)
      .select()
      .eq('id', lessonId)
      .eq('instructor_id', instructorId);

    if (updateError)
      throw new InternalServerErrorException(updateError.message);

    return updatedLesson;
  }

  async remove(lessonId: number, instructorId: string) {
    const { error } = await this.supabase
      .from('available_lessons')
      .delete()
      .eq('id', lessonId)
      .eq('instructor_id', instructorId);

    if (error) throw new InternalServerErrorException(error.message);
  }
}
