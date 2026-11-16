import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateInstructorStudentDto } from './dto/create-student.dto.js';
import { UpdateInstructorStudentDto } from './dto/update-student.dto.js';
import { SUPABASE } from '../../supabase/supabase.provider.js';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class instructorStudentsService {
  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {}

  ////////// Prüft, ob der Schüler zu diesem Fahrlehrer gehört ///////////
  async assertOwnStudent(studentId: string, instructorId: string) {
    const { data, error } = await this.supabase
      .from('student_instructors')
      .select('id')
      .eq('student_id', studentId)
      .eq('instructor_id', instructorId)
      .maybeSingle();

    if (error) throw new InternalServerErrorException(error.message);
    if (!data) throw new ForbiddenException('Das ist nicht dein Schüler');
  }

  //////////// Schüler erstellen //////////////
  async create(dto: CreateInstructorStudentDto, instructorId: string) {
    const email = dto.email.trim().toLowerCase();

    // 1. Gibt es den Schüler schon?
    const { data: existingStudent, error: studentFindError } =
      await this.supabase
        .from('driving_students')
        .select()
        .eq('email', email)
        .maybeSingle();

    if (studentFindError)
      throw new InternalServerErrorException(studentFindError.message);

    let student = existingStudent;
    let isNew = false;

    // 2. Wenn nicht vorhanden: neu anlegen
    if (!student) {
      const { data: auth, error: authError } =
        await this.supabase.auth.admin.createUser({
          email,
          password: dto.password,
          email_confirm: true,
        });

      if (authError) throw new InternalServerErrorException(authError.message);

      const { data, error } = await this.supabase
        .from('driving_students')
        .insert({ id: auth.user.id, full_name: dto.full_name, email })
        .select()
        .single();

      if (error) {
        await this.supabase.auth.admin.deleteUser(auth.user.id);
        throw new InternalServerErrorException(error.message);
      }

      student = data;
      isNew = true;
    }

    // 3. Schon in der Liste dieses Fahrlehrers?
    const { data: link, error: linkCheckError } = await this.supabase
      .from('student_instructors')
      .select('student_id')
      .eq('student_id', student.id)
      .eq('instructor_id', instructorId)
      .maybeSingle();

    if (linkCheckError)
      throw new InternalServerErrorException(linkCheckError.message);

    if (link)
      throw new ConflictException('Schüler ist bereits in deiner Liste');

    // 4. Verknüpfung anlegen
    const { error: linkError } = await this.supabase
      .from('student_instructors')
      .insert({
        student_id: student.id,
        instructor_id: instructorId,
        license_class: dto.license_classes,
      });

    if (linkError) {
      if (isNew) await this.supabase.auth.admin.deleteUser(student.id);
      throw new InternalServerErrorException(linkError.message);
    }

    // 5. Nur fehlende Führerscheinklassen eintragen
    const { data: existingClasses, error: classError } = await this.supabase
      .from('student_license_classes')
      .select('license_class')
      .eq('student_id', student.id);

    if (classError) throw new InternalServerErrorException(classError.message);

    const have = new Set(existingClasses.map((c) => c.license_class));
    const missing = dto.license_classes.filter((l) => !have.has(l));

    if (missing.length > 0) {
      const { error: licenseError } = await this.supabase
        .from('student_license_classes')
        .insert(
          missing.map((l) => ({ student_id: student.id, license_class: l })),
        );

      if (licenseError) {
        throw new InternalServerErrorException(licenseError.message);
      }
    }

    return student;
  }

  //////////  Alle Schüler eines Fahrlehrers ////////////
  async findAll(instructorId: string) {
    const { data, error } = await this.supabase
      .from('student_instructors')
      .select(
        `id, student_id,
         driving_students(*, student_feedback (*), student_license_classes (*))`,
      )
      .eq('instructor_id', instructorId);

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  //////////// Schüler aktualisieren /////////////////
  async update(
    studentId: string,
    dto: UpdateInstructorStudentDto,
    instructorId: string,
  ) {
    // Prüfe, ob der Schüler zu diesem Fahrlehrer gehört
    await this.assertOwnStudent(studentId, instructorId);
    // 1. Stammdaten
    const { error: studentUpdateError } = await this.supabase
      .from('driving_students')
      .update({
        full_name: dto.full_name,
        email: dto.email,
      })
      .eq('id', studentId);

    if (studentUpdateError)
      throw new InternalServerErrorException(studentUpdateError.message);

    // 2. Zuordnung zu diesem Fahrlehrer
    const { error: linkUpdateError } = await this.supabase
      .from('student_instructors')
      .update({ license_class: dto.license_classes })
      .eq('student_id', studentId)
      .eq('instructor_id', instructorId);

    if (linkUpdateError)
      throw new InternalServerErrorException(linkUpdateError.message);

    //3. Führerscheinklassen: alte löschen und neue einfügen

    const { error: deleteError } = await this.supabase
      .from('student_license_classes')
      .delete()
      .eq('student_id', studentId);

    if (deleteError)
      throw new InternalServerErrorException(deleteError.message);

    if (dto.license_classes?.length) {
      const { error: insertError } = await this.supabase
        .from('student_license_classes')
        .insert(
          dto.license_classes.map((license_class) => ({
            student_id: studentId,
            license_class,
          })),
        );
      if (insertError)
        throw new InternalServerErrorException(insertError.message);
    }
    const { data, error } = await this.supabase
      .from('driving_students')
      .select('*, student_instructors(*), student_license_classes(*)')
      .eq('id', studentId);

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  ///////// Schüler aus MEINER Liste entfernen //////////
  async remove(studentId: string, instructorId: string) {
    //  1. Verknüpfung löschen
    console.log(studentId);
    const { data: deleted, error } = await this.supabase
      .from('student_instructors')
      .delete()
      .eq('student_id', studentId)
      .eq('instructor_id', instructorId)
      .select();
    console.log(deleted, error);
    if (error) throw new InternalServerErrorException(error.message);
    if (!deleted) throw new NotFoundException('Schüler nicht in deiner Liste');

    // 2. Hat der Schüler noch andere Fahrlehrer?
    const { count, error: countError } = await this.supabase
      .from('student_instructors')
      .select('id', { count: 'exact', head: true })
      .eq('student_id', studentId);
    console.log(count, countError);
    if (countError) throw new InternalServerErrorException(countError.message);

    // Noch jemand hat ihn?
    if ((count ?? 0) > 0) return { error: null, studentDeleted: false };

    //  3. schüler komplett löschen
    const { error: deleteError } = await this.supabase
      .from('driving_students')
      .delete()
      .eq('id', studentId);

    console.log(deleteError);
    if (deleteError)
      throw new InternalServerErrorException(deleteError.message);

    const { error: authError } =
      await this.supabase.auth.admin.deleteUser(studentId);
    if (authError) throw new InternalServerErrorException(authError.message);

    return { error: null, studentDeleted: true };
  }
}
