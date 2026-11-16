import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { UpdateInstructorExamslotDto } from './dto/update-update-instructor-examslot.dto.js';
import { SUPABASE } from '../../supabase/supabase.provider.js';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class UpdateInstructorExamslotService {
  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {}

  async findAll() {
    const { data, error: linkError } = await this.supabase
      .from('exam_days')
      .select(`*, exam_slots(*)`)
      .order('exam_date', { ascending: true })
      .order('student_appointment', {
        referencedTable: 'exam_slots',
        ascending: true,
      });
    if (linkError) throw new InternalServerErrorException(linkError.message);

    return data;
  }

  async update(
    SlotId: string,
    dto: UpdateInstructorExamslotDto,
    instructorId: string,
  ) {
    const { data: updatedSlot, error: updateError } = await this.supabase
      .from('exam_slots')
      .update({
        student_name: dto.student_name,
        student_appointment: dto.student_appointment,
        license_class: dto.license_class,
        instructor_name: dto.instructor_name,
        student_id: dto.student_id,
      })
      .eq('id', SlotId)
      .select();

    if (updateError)
      throw new InternalServerErrorException(updateError.message);

    if (!updatedSlot || updatedSlot.length === 0)
      throw new NotFoundException('Termin nicht gefunden');

    return updatedSlot;
  }
}
