import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { InstructorDashboardModule } from './instructor/instructor-dashboard/instructor-dashboard.module.js';
import { instructorStudentsModule } from './instructor/instructorStudents/instructorStudents.module.js';
import { InstructorStudentFeedbacksModule } from './instructor/instructor-student-feedbacks/instructor-student-feedbacks.module.js';
import { UpdateInstructorExamslotModule } from './instructor/instructor-examslot-update/update-instructor-examslot.module.js';
import { InstructorCreateDrivingLessonModule } from './instructor/instructor-create-driving-lesson/instructor-create-driving-lesson.module.js';
import { InstructorAcceptedlessonByStudentModule } from './instructor/instructor-acceptedlesson-by-student/instructor-acceptedlesson-by-student.module.js';
import { StudentLessonModule } from './student/student-lesson/student-lesson.module.js';
import { StudentExamAppointmentModule } from './student/student-exam-appointment/student-exam-appointment.module.js';
import { StudentFeedbacksModule } from './student/student-feedbacks/student-feedbacks.module.js';
import { OfficeExamDaysModule } from './office/office-exam-days/office-exam-days.module.js';
import { OfficeExamSlotModule } from './office/office-exam-slot/office-exam-slot.module.js';
import { OfficeInstructorAccountModule } from './office/office-instructor-account/office-instructor-account.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    InstructorDashboardModule,
    instructorStudentsModule,
    InstructorStudentFeedbacksModule,
    UpdateInstructorExamslotModule,
    InstructorCreateDrivingLessonModule,
    InstructorAcceptedlessonByStudentModule,
    StudentLessonModule,
    StudentExamAppointmentModule,
    StudentFeedbacksModule,
    OfficeExamDaysModule,
    OfficeExamSlotModule,
    OfficeInstructorAccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
