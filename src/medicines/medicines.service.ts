import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Like } from 'typeorm';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { MedicineRepository } from '../models/repositories/medicine.repository';
import { PharmacyRepository } from '../models/repositories/pharmacy.repository';

@Injectable()
export class MedicinesService {
  constructor(
    private medicineRepository: MedicineRepository,
    private pharmacyRepository: PharmacyRepository,
  ) {}

  async getMedicine(id: number) {
    return await this.medicineRepository.findOneOrFail(id).catch(() => {
      throw new NotFoundException('약을 찾지 못했습니다.');
    });
  }

  async getMedicines(
    page: number,
    count: number,
    order: string,
    method: 'ASC' | 'DESC',
  ) {
    return await this.medicineRepository.find({
      take: count,
      skip: page,
      order: { [order]: method },
    });
  }

  async create(createMedicineDto: CreateMedicineDto) {
    const pharmacy = await this.pharmacyRepository.findOne(
      createMedicineDto.pharmacy,
    );
    if (!pharmacy) throw await new NotFoundException();
    return await this.medicineRepository.save(
      Object.assign(createMedicineDto, { pharmacy }),
    );
  }

  async deleteById(id: number) {
    return await this.medicineRepository.delete(id);
  }

  async deleteAll() {
    return await this.medicineRepository.delete({});
  }
}
