import { Module } from '@nestjs/common';
import { InstructorDashboardService } from './instructor-dashboard.service.js';
import { InstructorDashboardController } from './instructor-dashboard.controller.js';
import { SupabaseModule } from '../../supabase/supabase..module.js';

@Module({
  imports: [SupabaseModule],
  controllers: [InstructorDashboardController],
  providers: [InstructorDashboardService],
})
export class InstructorDashboardModule {}
