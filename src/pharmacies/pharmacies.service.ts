import { Injectable, NotFoundException } from '@nestjs/common';
import { In } from 'typeorm';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { MedicineRepository } from '../models/repositories/medicine.repository';
import { PharmacyRepository } from '../models/repositories/pharmacy.repository';

@Injectable()
export class PharmaciesService {
  constructor(
    private pharmaciesRepository: PharmacyRepository,

    private medicinesRepository: MedicineRepository,
  ) {}

  async get(id: number) {
    return await this.pharmaciesRepository.findOneOrFail(id).catch(() => {
      throw new NotFoundException('알 수 없는 약국 번호입니다.');
    });
  }

  async getPharmacies(
    page: number,
    count: number,
    order: string,
    method: 'ASC' | 'DESC',
  ) {
    return await this.pharmaciesRepository.find({
      take: count,
      skip: page,
      order: { [order]: method },
    });
  }

  async create(createPharmacyDto: CreatePharmacyDto) {
    return await this.pharmaciesRepository.save(createPharmacyDto);
  }
  async update(id: number, updatePharmacyDto: UpdatePharmacyDto) {
    let currentObject = await this.pharmaciesRepository.findOne(id);
    if (!currentObject) {
      throw new NotFoundException('해당 약국이 존재하지 않습니다.');
    }
    const newMedicines = await this.medicinesRepository.find({
      where: { id: In(updatePharmacyDto.medicines) },
    });
    currentObject = {
      ...currentObject,
      ...updatePharmacyDto,
      medicines: newMedicines,
    };
    return this.pharmaciesRepository.save({
      ...currentObject,
      medicines: newMedicines,
    });
  }

  async deleteById(id: number) {
    return await this.pharmaciesRepository.delete(id);
  }

  async deleteAll() {
    return await this.pharmaciesRepository.delete({});
  }
}
