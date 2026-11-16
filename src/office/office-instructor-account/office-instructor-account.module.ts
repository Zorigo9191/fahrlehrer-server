import { Module } from '@nestjs/common';
import { OfficeInstructorAccountController } from './office-instructor-account.controller.js';
import { OfficeInstructorAccountService } from './office-instructor-account.service.js';

@Module({
  controllers: [OfficeInstructorAccountController],
  providers: [OfficeInstructorAccountService],
})
export class OfficeInstructorAccountModule {}
