import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentLessonDto } from './dto/create-student-lesson.dto.js';
import { UpdateStudentLessonDto } from './dto/update-student-lesson.dto.js';
import { SUPABASE } from '../../supabase/supabase.provider.js';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class StudentLessonService {
  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {}

  async accept(lessonId: number, studentId: string) {
    const { data, error } = await this.supabase
      .from('available_lessons')
      .update({ student_id: studentId, status: 'vergeben' })
      .eq('id', lessonId)
      .eq('status', 'offen')
      .select();

    if (error) throw new InternalServerErrorException(error.message);
    if (!data || data.length === 0)
      throw new NotFoundException('Termin nicht verfügbar');
    return data;
  }
}
