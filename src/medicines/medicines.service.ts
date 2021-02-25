import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Like } from 'typeorm';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { MedicineRepository } from '../models/repositories/medicine.repository';

@Injectable()
export class MedicinesService {
  constructor(private medicineRepository: MedicineRepository) {}

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
    const medicine = await this.medicineRepository.findOne({
      name: createMedicineDto.name,
    });
    if (medicine) {
      throw await new ConflictException('이미 존재하는 의약품입니다.');
    }
    return await this.medicineRepository.save(createMedicineDto);
  }
}
