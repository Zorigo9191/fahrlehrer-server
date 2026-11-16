import {
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

export async function assertOwnStudent(
  supabase: SupabaseClient,
  studentId: string,
  instructorId: string,
) {
  const { data, error } = await supabase
    .from('student_instructors')
    .select('id')
    .eq('student_id', studentId)
    .eq('instructor_id', instructorId)
    .maybeSingle();

  if (error) throw new InternalServerErrorException(error.message);
  if (!data) throw new ForbiddenException('Das ist nicht dein Schüler');
}
