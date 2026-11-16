import { Module } from '@nestjs/common';
import { StudentLessonService } from './student-lesson.service.js';
import { StudentLessonController } from './student-lesson.controller.js';

@Module({
  controllers: [StudentLessonController],
  providers: [StudentLessonService],
})
export class StudentLessonModule {}
