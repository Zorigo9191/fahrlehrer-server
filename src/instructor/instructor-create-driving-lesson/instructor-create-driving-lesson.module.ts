import { Module } from '@nestjs/common';
import { InstructorCreateDrivingLessonService } from './instructor-create-driving-lesson.service.js';
import { InstructorCreateDrivingLessonController } from './instructor-create-driving-lesson.controller.js';

@Module({
  controllers: [InstructorCreateDrivingLessonController],
  providers: [InstructorCreateDrivingLessonService],
})
export class InstructorCreateDrivingLessonModule {}
