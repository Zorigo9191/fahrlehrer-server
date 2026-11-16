import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateOfficeExamDayDto } from './dto/create-office-exam-day.dto.js';
import { UpdateOfficeExamDayDto } from './dto/update-office-exam-day.dto.js';
import { SUPABASE } from '../../supabase/supabase.provider.js';
import { SupabaseClient } from '@supabase/supabase-js';
import { createDefaultExamSlots } from '../utils/createDefaultExamSlots.js';
import { Database } from '../../supabase/database.types.js';
import { CreateOfficeExamSlotDto } from './dto/create-office-exam-slot.dto.js';

@Injectable()
export class OfficeExamDaysService {
  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {}

  async createNewDate(dto: CreateOfficeExamDayDto, employeeId: string) {
    const { data: createdExamDay, error: createDayError } = await this.supabase
      .from('exam_days')
      .insert({
        exam_date: dto.exam_date,
        license_class: dto.license_class,
        slots: dto.slots,
      })
      .select()
      .single();

    if (createDayError)
      throw new InternalServerErrorException(createDayError.message);

    const { error: slotsError } = await createDefaultExamSlots(
      this.supabase,
      createdExamDay.id,
      createdExamDay.slots,
    );

    if (slotsError) {
      await this.supabase
        .from('exam_days')
        .delete()
        .eq('id', createdExamDay.id);
      throw new InternalServerErrorException(
        'Prüfungstag konnte nicht angelegt werden',
      );
    }
    return createdExamDay;
  }

  async createNewSlot(payload: CreateOfficeExamSlotDto) {
    const { data: newSlot, error: newSlotError } = await this.supabase
      .from('exam_slots')
      .insert([payload])
      .select()
      .single();
    console.log(payload, newSlotError);
    if (newSlotError)
      throw new InternalServerErrorException(newSlotError.message);
    return newSlot;
  }

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

  findOne(id: number) {
    return `This action returns a #${id} officeExamDay`;
  }

  async update(dayId: string, dto: UpdateOfficeExamDayDto) {
    const { data, error } = await this.supabase
      .from('exam_days')
      .update({
        exam_date: dto.exam_date,
        license_class: dto.license_class,
        slots: dto.slots,
      })
      .eq('id', dayId)
      .select()
      .single();

    if (error) {
      console.error('Fehler beim Aktualisieren:', error);
      return { data: null, error };
    }

    return { data, error: null };
  }

  async removeExamDay(dayId: String) {
    const { error } = await this.supabase
      .from('exam_days')
      .delete()
      .eq('id', dayId);

    if (error) {
      console.error('Supabase Delete Error:', error.message);

      throw new InternalServerErrorException(
        'Der Prüfungstag konnte nicht gelöscht werden.',
      );
    }

    return { success: true };
  }

  async removeExamSlot(slotId: string) {
    console.log(slotId);
    const { error } = await this.supabase
      .from('exam_slots')
      .delete()
      .eq('id', slotId);

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return { success: true };
  }
}
