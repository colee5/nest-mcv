import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './reports.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);

    // Assigning the incoming user from the header as the
    // owned for the report which is being created
    report.owner = user;

    return this.repo.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: parseInt(id) } });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    report.approved = approved;
    return this.repo.save(report);
  }

  async createEstimate({
    brand,
    model,
    lng,
    lat,
    year,
    mileage,
  }: GetEstimateDto) {
    const estimate = await this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('brand = :brand', { brand })
      .andWhere('model = :model', { model })
      .andWhere(':lng - lng BETWEEN -5 AND 5', { lng })
      .andWhere(':lat - lat BETWEEN -5 AND 5', { lat })
      .andWhere('approved IS TRUE')
      .andWhere(':year - year BETWEEN -3 AND 3', { year })
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();

    if (!estimate || estimate.price === null) {
      throw new NotFoundException(
        'No approved matches found for this vehicle criteria',
      );
    }

    return estimate;
  }
}
