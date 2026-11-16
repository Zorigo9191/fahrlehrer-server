import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OfficeInstructorAccountService } from './office-instructor-account.service.js';
import { CreateOfficeInstructorAccountDto } from './dto/create-office-instructor-account.dto.js';
import { UpdateOfficeInstructorAccountDto } from './dto/update-office-instructor-account.dto.js';
import { Roles } from '../../auth/roles.decorator.js';
import { AuthGuard } from '../../auth/auth.guard.js';
import { RolesGuard } from '../../auth/roles.guard.js';

@UseGuards(AuthGuard, RolesGuard)
@Roles('office')
@Controller('office/instructor-account')
export class OfficeInstructorAccountController {
  constructor(private readonly service: OfficeInstructorAccountService) {}

  @Post()
  create(@Body() dto: CreateOfficeInstructorAccountDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateOfficeInstructorAccountDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
