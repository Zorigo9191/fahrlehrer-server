import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateOfficeInstructorAccountDto } from './dto/create-office-instructor-account.dto.js';
import { UpdateOfficeInstructorAccountDto } from './dto/update-office-instructor-account.dto.js';
import { SUPABASE } from '../../supabase/supabase.provider.js';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class OfficeInstructorAccountService {
  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {}

  async create(dto: CreateOfficeInstructorAccountDto) {
    // 1. Auth-User anlegen
    const { data: authData, error: authError } =
      await this.supabase.auth.admin.createUser({
        email: dto.email,
        password: dto.password,
        email_confirm: false,
        user_metadata: {
          first_name: dto.first_name,
          last_name: dto.last_name,
          phone_number: dto.phone_number,
        },

        app_metadata: { role: 'instructor' },
      });

    if (authError) {
      if (authError.code === 'email_exists') {
        throw new ConflictException('E mail ist bereits vergeben');
      }
      throw new InternalServerErrorException(authError.message);
    }

    const userId = authData.user.id;

    // 2. Profil in instructors speichern

    const { data, error } = await this.supabase
      .from('instructors')
      .insert({
        id: userId,
        first_name: dto.first_name,
        last_name: dto.last_name,
        phone_number: dto.phone_number,
        teaching_classes: dto.teaching_classes,
        student_count: 0,
        role: 'instructor',
      })
      .select()
      .single();

    if (error) {
      await this.supabase.auth.admin.deleteUser(userId);
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  findAll() {
    return `This action returns all officeInstructorAccount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} officeInstructorAccount`;
  }

  async update(instructorId: string, dto: UpdateOfficeInstructorAccountDto) {
    const { data: updatedInstructor, error: updateError } = await this.supabase
      .from('instructors')
      .update({
        first_name: dto.first_name,
        last_name: dto.last_name,
        teaching_classes: dto.teaching_classes,
        phone_number: dto.phone_number,
      })
      .eq('id', instructorId)
      .select();

    if (updateError)
      throw new InternalServerErrorException(updateError.message);

    return updatedInstructor;
  }

  async remove(instructorId: string) {
    const { error: deleteError } = await this.supabase
      .from('instructors')
      .delete()
      .eq('id', instructorId);

    if (deleteError) {
      throw new InternalServerErrorException(
        'Fahrlehrer konnte nicht gelöscht werden',
      );
    }

    const { error: authError } =
      await this.supabase.auth.admin.deleteUser(instructorId);

    if (authError) {
      throw new InternalServerErrorException(authError.message);
    }

    return { succes: true };
  }
}
