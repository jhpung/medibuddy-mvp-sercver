import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pharmacy } from '../entities/pharmacy.entity';
import { Treatment } from '../entities/treatment.entity';
import { Repository } from 'typeorm';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { Prescription } from '../entities/prescription.entity';
import { fstat } from 'fs';

@Injectable()
export class TreatmentsService {
  constructor(
    @InjectRepository(Treatment)
    private treatmentsRepository: Repository<Treatment>,

    @InjectRepository(Pharmacy)
    private pharmaciesRepository: Repository<Pharmacy>,

    @InjectRepository(Prescription)
    private prescriptionsRepository: Repository<Prescription>,
  ) {}

  async get(id: number): Promise<Treatment> {
    return await this.treatmentsRepository.findOne(id);
  }

  async paging(
    page: number,
    count: number,
    orderBy: string,
    method: 'ASC' | 'DESC',
  ): Promise<Treatment[]> {
    return await this.treatmentsRepository.find({
      skip: page,
      take: count,
      order: { [orderBy]: method },
    });
  }

  async create(createTreatmentDto: CreateTreatmentDto): Promise<Treatment> {
    const pharmacy: Pharmacy = await this.pharmaciesRepository.findOne(
      createTreatmentDto.pharmacy,
      { relations: ['medicines'] },
    );
    return this.treatmentsRepository.save(
      new Treatment({ ...createTreatmentDto, pharmacy: pharmacy }),
    );
  }

  async update(updateTreatmentDto: UpdateTreatmentDto): Promise<Treatment> {
    let pharmacy = null;
    let prescription = null;
    const treatment = await this.treatmentsRepository.findOne(
      updateTreatmentDto.id,
    );
    console.log(updateTreatmentDto);
    if (!treatment) throw await new NotFoundException('처방전을 없습니다.');
    if (updateTreatmentDto.pharmacy) {
      pharmacy = await this.pharmaciesRepository.findOne(
        updateTreatmentDto.pharmacy,
        { relations: ['medicines'] },
      );
      if (!pharmacy) {
        throw new NotFoundException('약국이 존재하지 않습니다.');
      }
    }
    if (updateTreatmentDto.prescription) {
      prescription = await this.prescriptionsRepository.findOne(
        updateTreatmentDto.prescription,
      );
      if (!prescription) {
        throw await new NotFoundException('처방전이 존재하지 않습니다.');
      }
    }
    Object.assign(treatment, updateTreatmentDto);
    return this.treatmentsRepository.save({
      ...treatment,
      pharmacy: pharmacy ? pharmacy : treatment.pharmacy,
      prescription: prescription ? prescription : treatment.prescription,
    });
  }
}
