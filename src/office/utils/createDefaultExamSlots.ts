import { Database } from '../../supabase/database.types.js';
import { SupabaseClient } from '@supabase/supabase-js';

type ExamSlotInsert = Database['public']['Tables']['exam_slots']['Insert'];

export async function createDefaultExamSlots(
  supabase: SupabaseClient,
  examDayId: string,
  slots: number,
) {
  const defaultTimes = [
    '08:00',
    '08:55',
    '09:50',
    '10:45',
    '11:40',
    '12:35',
    '13:30',
    '14:25',
  ];

  const slotsToInsert: ExamSlotInsert[] = [];

  for (let i = 0; i < slots; i++) {
    slotsToInsert.push({
      exam_day_id: examDayId,
      exam_time: defaultTimes[i],
      student_appointment: defaultTimes[i],
      student_name: null,
      instructor_name: null,
      license_class: '',
      status: 'gray',
      student_id: null,
    });
  }

  const { data, error } = await supabase
    .from('exam_slots')
    .insert(slotsToInsert)
    .select();

  if (error) {
    console.log('Fehler beim Erstellen der Default-slots', error);
    return { data: null, error };
  }
  return { data, error: null };
}
