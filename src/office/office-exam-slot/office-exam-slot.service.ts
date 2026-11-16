import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOfficeExamSlotDto } from './dto/create-office-exam-slot.dto.js';
import { UpdateOfficeExamSlotDto } from './dto/update-office-exam-slot.dto.js';
import { SUPABASE } from '../../supabase/supabase.provider.js';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class OfficeExamSlotService {
  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {}

  async update(slotId: string, dto: UpdateOfficeExamSlotDto) {
    const { data: updatedSlot, error: updateError } = await this.supabase
      .from('exam_slots')
      .update({
        student_name: dto.student_name,
        student_appointment: dto.student_appointment,
        license_class: dto.license_class,
        instructor_name: dto.instructor_name,
        student_id: dto.student_id,
        notes: dto.notes,
      })
      .eq('id', slotId)
      .select();

    if (updateError)
      throw new InternalServerErrorException(updateError.message);

    if (!updatedSlot || updatedSlot.length === 0)
      throw new NotFoundException('Termin nicht gefunden');

    return updatedSlot;
  }

  async updateSlotStatus(slotId: string, dto: UpdateOfficeExamSlotDto) {
    const { data: status, error: statusError } = await this.supabase
      .from('exam_slots')
      .update({
        status: dto.status,
        ...(dto.notes !== undefined && { notes: dto.notes }),
      })
      .eq('id', slotId)
      .select();
    if (statusError)
      throw new InternalServerErrorException(statusError.message);

    return status;
  }
}
