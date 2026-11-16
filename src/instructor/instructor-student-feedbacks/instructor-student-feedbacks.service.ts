import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateInstructorStudentFeedbackDto } from './dto/create-instructor-student-feedback.dto.js';
import { UpdateInstructorStudentFeedbackDto } from './dto/update-instructor-student-feedback.dto.js';
import { SUPABASE } from '../../supabase/supabase.provider.js';
import { SupabaseClient } from '@supabase/supabase-js';
import { assertOwnStudent } from '../../common/utils/assert-own-student.util.js';

@Injectable()
export class InstructorStudentFeedbacksService {
  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {}

  async create(
    studentId: string,
    dto: CreateInstructorStudentFeedbackDto,
    instructorId: string,
  ) {
    await assertOwnStudent(this.supabase, studentId, instructorId);

    const { data, error } = await this.supabase
      .from('student_feedback')
      .insert({ ...dto, student_id: studentId, instructor_id: instructorId })
      .select();

    if (error) throw new InternalServerErrorException(error.message);
    return { data, error: null };
  }

  async findAll(studentId: string, instructorId: string) {
    await assertOwnStudent(this.supabase, studentId, instructorId);

    const { data, count, error } = await this.supabase
      .from('student_feedback')
      .select('*, instructors(*)', { count: 'exact' })
      .eq('student_id', studentId);

    if (error) throw new InternalServerErrorException(error.message);
    return { data, count: count ?? 0, error: null };
  }

  async findOne(studentId: string, id: number, instructorId: string) {
    await assertOwnStudent(this.supabase, studentId, instructorId);

    const { data, error } = await this.supabase
      .from('student_feedback')
      .select('*, instructors(*)')
      .eq('id', id)
      .eq('student_id', studentId)
      .maybeSingle();

    if (error) throw new InternalServerErrorException(error.message);
    if (!data) throw new NotFoundException('Feedback nicht gefunden');
    return data;
  }

  async update(
    studentId: string,
    id: number,
    dto: UpdateInstructorStudentFeedbackDto,
    instructorId: string,
  ) {
    await assertOwnStudent(this.supabase, studentId, instructorId);

    const { data, error } = await this.supabase
      .from('student_feedback')
      .update({ feedback: dto.feedback })
      .eq('id', id)
      .eq('student_id', studentId)
      .select();

    if (error) throw new InternalServerErrorException(error.message);
    if (!data || data.length === 0)
      throw new NotFoundException('Feedback nicht gefunden');
    return data;
  }

  async remove(studentId: string, id: number, instructorId: string) {
    await assertOwnStudent(this.supabase, studentId, instructorId);

    const { data, error } = await this.supabase
      .from('student_feedback')
      .delete()
      .eq('id', id)
      .eq('student_id', studentId)
      .select();

    if (error) throw new InternalServerErrorException(error.message);
    if (!data || data.length === 0)
      throw new NotFoundException('Feedback nicht gefunden');
    return { error: null };
  }
}
