import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicine } from '../entities/medicine.entity';
import { Like } from 'typeorm';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { MedicineRepository } from '../repositories/medicine.repository';

@Injectable()
export class MedicinesService {
  constructor(private medicineRepository: MedicineRepository) {}

  async getMedicine(id: number) {
    return await this.medicineRepository.findOne(id);
  }

  async getMedicines(
    page: number,
    count: number,
    order: string,
    method: 'ASC' | 'DESC',
    name: string | null,
  ) {
    return await this.medicineRepository.find({
      take: count,
      skip: page,
      order: { [order]: method },
      where: name != null ? { name: Like(`%${name}%`) } : undefined,
    });
  }

  async create(createMedicineDto: CreateMedicineDto) {
    return await this.medicineRepository.save(createMedicineDto);
  }
}
