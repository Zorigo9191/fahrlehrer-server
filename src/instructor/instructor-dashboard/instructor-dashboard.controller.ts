import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InstructorDashboardService } from './instructor-dashboard.service.js';

@Controller('instructor-dashboard')
export class InstructorDashboardController {
  constructor(
    private readonly instructorDashboardService: InstructorDashboardService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instructorDashboardService.findOne(id);
  }
}
