import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateStudentExamAppointmentDto } from './dto/create-student-exam-appointment.dto.js';
import { UpdateStudentExamAppointmentDto } from './dto/update-student-exam-appointment.dto.js';
import { SUPABASE } from '../../supabase/supabase.provider.js';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class StudentExamAppointmentService {
  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {}

  async findAll(studentId: string) {
    const { data: examAppointments, error: examAppointmentsError } =
      await this.supabase
        .from('exam_slots')
        .select('*, exam_days(exam_date)')
        .eq('student_id', studentId);

    if (examAppointmentsError)
      throw new InternalServerErrorException(examAppointmentsError.message);

    return examAppointments;
  }
}
