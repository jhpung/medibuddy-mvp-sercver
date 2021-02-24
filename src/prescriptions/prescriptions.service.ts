import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prescription } from '../entities/prescription.entity';
import { Repository } from 'typeorm';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { Treatment } from '../entities/treatment.entity';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(Prescription)
    private prescriptionRepository: Repository<Prescription>,

    @InjectRepository(Treatment)
    private treatmentRepository: Repository<Treatment>,
  ) {}

  async get(id: number) {
    return await this.prescriptionRepository.findOne(id);
  }

  async paging(
    page: number,
    count: number,
    orderBy: string,
    method: 'ASC' | 'DESC',
  ) {
    return await this.prescriptionRepository.find({
      skip: page,
      take: count,
      order: { [orderBy]: method },
    });
  }

  async create(
    createPrescriptionDto: CreatePrescriptionDto,
    file: Express.Multer.File,
  ) {
    const treatment: Treatment = await this.treatmentRepository.findOne(
      createPrescriptionDto.treatment,
    );
    if (!treatment) {
      throw await new NotFoundException('진료항목이 존재하지 않습니다.');
    }
    return await this.prescriptionRepository.save({
      path: file.path,
      treatment: treatment,
    });
  }
}
