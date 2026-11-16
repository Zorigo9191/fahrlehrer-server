import { Module } from '@nestjs/common';
import { InstructorStudentFeedbacksService } from './instructor-student-feedbacks.service.js';
import { InstructorStudentFeedbacksController } from './instructor-student-feedbacks.controller.js';

@Module({
  controllers: [InstructorStudentFeedbacksController],
  providers: [InstructorStudentFeedbacksService],
})
export class InstructorStudentFeedbacksModule {}
