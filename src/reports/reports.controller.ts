import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';

// 1. GET /reports -> Get an estimate for the cars value
// 2. POST /reports -> Report how much a vehicle is sold for
// 3. PATCH /reports/:id -> Approve or reject a report submitted by a user

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createReport(@Body() body: CreateReportDto) {
    return this.reportsService.create(body);
  }
}
