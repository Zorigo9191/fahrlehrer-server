import { Module } from '@nestjs/common';
import { StudentFeedbacksService } from './student-feedbacks.service.js';
import { StudentFeedbacksController } from './student-feedbacks.controller.js';

@Module({
  controllers: [StudentFeedbacksController],
  providers: [StudentFeedbacksService],
})
export class StudentFeedbacksModule {}
