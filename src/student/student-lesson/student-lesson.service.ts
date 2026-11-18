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
import { Database } from '../../supabase/database.types.js';

type GetLessonParams = {
  instructorIds: string[];
  studentLicenseClass?: string[];
};

type AvailableLessonRow =
  Database['public']['Tables']['available_lessons']['Row'];

@Injectable()
export class StudentLessonService {
  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {}

  async findAll({
    instructorIds,
    studentLicenseClass,
  }: GetLessonParams): Promise<AvailableLessonRow[]> {
    let query = this.supabase
      .from('available_lessons')
      .select('*')
      .in('instructor_id', instructorIds)
      .eq('status', 'offen');

    if (studentLicenseClass) {
      query = query.in('license_class', studentLicenseClass);
    }

    const { data, error } = await query;

    if (error) throw new InternalServerErrorException(error.message);

    return data ?? [];
  }

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
