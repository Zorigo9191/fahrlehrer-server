import { Module } from '@nestjs/common';
import { instructorStudentsController } from './instructorStudents.controller.js';
import { instructorStudentsService } from './instructorStudents.service.js';

@Module({
  controllers: [instructorStudentsController],
  providers: [instructorStudentsService],
})
export class instructorStudentsModule {}
