import { PartialType } from '@nestjs/swagger';
import { CreateInstructorDashboardDto } from './create-instructor-dashboard.dto.js';

export class UpdateInstructorDashboardDto extends PartialType(CreateInstructorDashboardDto) {}
