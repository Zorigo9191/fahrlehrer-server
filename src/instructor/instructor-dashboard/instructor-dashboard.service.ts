import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SUPABASE } from '../../supabase/supabase.provider.js';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class InstructorDashboardService {
  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {}

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from('instructors')
      .select('first_name')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException('Fahrlehrer nicht gefunden');
    }

    return {
      first_name: data.first_name ?? 'Fahrlehrer',
    };
  }
}
