import { Module } from '@nestjs/common';
import { InstructorAcceptedlessonByStudentService } from './instructor-acceptedlesson-by-student.service.js';
import { InstructorAcceptedlessonByStudentController } from './instructor-acceptedlesson-by-student.controller.js';

@Module({
  controllers: [InstructorAcceptedlessonByStudentController],
  providers: [InstructorAcceptedlessonByStudentService],
})
export class InstructorAcceptedlessonByStudentModule {}
