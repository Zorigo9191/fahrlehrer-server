import { Module } from '@nestjs/common';
import { StudentExamAppointmentService } from './student-exam-appointment.service.js';
import { StudentExamAppointmentController } from './student-exam-appointment.controller.js';

@Module({
  controllers: [StudentExamAppointmentController],
  providers: [StudentExamAppointmentService],
})
export class StudentExamAppointmentModule {}
