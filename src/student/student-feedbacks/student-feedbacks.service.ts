import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateStudentFeedbackDto } from './dto/create-student-feedback.dto.js';
import { UpdateStudentFeedbackDto } from './dto/update-student-feedback.dto.js';
import { SUPABASE } from '../../supabase/supabase.provider.js';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class StudentFeedbacksService {
  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {}

 

  async findAll(userId: string, role: string) {
    const column = role === 'instructor' ? 'instructor_id' : 'student_id';

    const { data, error } = await this.supabase
      .from('student_feedback')
      .select('*, instructors!fk_feedback_instructor(first_name)')
      .eq(column, userId);

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }


}
