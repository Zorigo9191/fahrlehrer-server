import { Module } from '@nestjs/common';
import { OfficeExamDaysController } from './office-exam-days.controller.js';
import { OfficeExamDaysService } from './office-exam-days.service.js';

@Module({
  controllers: [OfficeExamDaysController],
  providers: [OfficeExamDaysService],
})
export class OfficeExamDaysModule {}
