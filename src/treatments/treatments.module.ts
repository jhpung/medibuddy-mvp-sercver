import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pharmacy } from '../entities/pharmacy.entity';
import { Prescription } from '../entities/prescription.entity';
import { Treatment } from '../entities/treatment.entity';
import { TreatmentsController } from './treatments.controller';
import { TreatmentsService } from './treatments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Treatment, Pharmacy, Prescription])],
  controllers: [TreatmentsController],
  providers: [TreatmentsService],
})
export class TreatmentsModule {}
