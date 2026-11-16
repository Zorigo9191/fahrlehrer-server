import { Module } from '@nestjs/common';
import { UpdateInstructorExamslotController } from './update-instructor-examslot.controller.js';
import { UpdateInstructorExamslotService } from './update-instructor-examslot.service.js';

@Module({
  controllers: [UpdateInstructorExamslotController],
  providers: [UpdateInstructorExamslotService],
})
export class UpdateInstructorExamslotModule {}
