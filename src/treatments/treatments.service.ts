import { Injectable, NotFoundException } from '@nestjs/common';
import { Pharmacy } from '../models/entities/pharmacy.entity';
import { Treatment } from '../models/entities/treatment.entity';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { TreatmentRepository } from '../models/repositories/treatment.repository';
import { PharmacyRepository } from '../models/repositories/pharmacy.repository';
import { UploadPrescriptionDto } from './dto/upload-prescription.dto';
import { Response } from 'express';

@Injectable()
export class TreatmentsService {
  constructor(
    private treatmentRepository: TreatmentRepository,

    private pharmacyRepository: PharmacyRepository,
  ) {}

  async get(id: number): Promise<Treatment> {
    const treatment = await this.treatmentRepository.findOne(id, {
      relations: ['pharmacy', 'pharmacy.medicines'],
    });
    if (!treatment) {
      throw new NotFoundException('알 수 없는 진료 요청입니다.');
    }
    return treatment;
  }

  async paging(
    page: number,
    count: number,
    orderBy: string,
    method: 'ASC' | 'DESC',
  ): Promise<Treatment[]> {
    return await this.treatmentRepository.find({
      skip: page,
      take: count,
      order: { [orderBy]: method },
      relations: ['pharmacy', 'pharmacy.medicines'],
    });
  }

  async create(createTreatmentDto: CreateTreatmentDto): Promise<Treatment> {
    const pharmacy: Pharmacy = await this.pharmacyRepository.findOne(
      createTreatmentDto.pharmacy,
      { relations: ['medicines'] },
    );
    return this.treatmentRepository.save(
      new Treatment({
        ...createTreatmentDto,
        pharmacy: pharmacy,
      }),
    );
  }

  async update(
    id: number,
    updateTreatmentDto: UpdateTreatmentDto,
  ): Promise<Treatment> {
    let pharmacy = null;
    const treatment = await this.treatmentRepository.findOne(id);
    if (!treatment)
      throw await new NotFoundException('존재하지 않는 진료요청입니다.');
    if (updateTreatmentDto.pharmacy) {
      pharmacy = await this.pharmacyRepository.findOne(
        updateTreatmentDto.pharmacy,
        { relations: ['medicines'] },
      );
      if (!pharmacy) {
        throw new NotFoundException('약국이 존재하지 않습니다.');
      }
    }
    const newTreatment = {
      ...treatment,
      ...updateTreatmentDto,
      pharmacy: pharmacy ? pharmacy : treatment.pharmacy,
    };

    Object.assign(treatment, updateTreatmentDto);
    return {
      ...(await this.treatmentRepository.save(newTreatment)),
    };
  }

  async uploadPrescription(
    file: Express.Multer.File,
    uploadPrescriptionDto: UploadPrescriptionDto,
    id: number,
  ) {
    const treatment = await this.treatmentRepository.findOne(id);
    if (!treatment) {
      throw await new NotFoundException('알 수 없는 진료기록입니다.');
    }

    treatment.prescription = file.path;
    return await this.treatmentRepository.save(treatment);
  }

  async deleteById(id: number) {
    return await this.treatmentRepository.delete(id);
  }

  async deleteAll() {
    return await this.treatmentRepository.delete({});
  }

  async getPrescription(res: Response, id: number) {
    const treatment = await this.treatmentRepository.findOne(id);
    if (!treatment) throw await new NotFoundException();
    return res.download(treatment.prescription);
  }
}
