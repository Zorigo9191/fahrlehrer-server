import { Module } from '@nestjs/common';
import { OfficeExamSlotController } from './office-exam-slot.controller.js';
import { OfficeExamSlotService } from './office-exam-slot.service.js';

@Module({
  controllers: [OfficeExamSlotController],
  providers: [OfficeExamSlotService],
})
export class OfficeExamSlotModule {}
