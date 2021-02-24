import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pharmacy } from '../entities/pharmacy.entity';
import { In, Repository } from 'typeorm';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { Medicine } from '../entities/medicine.entity';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';

@Injectable()
export class PharmaciesService {
  constructor(
    @InjectRepository(Pharmacy)
    private pharmaciesRepository: Repository<Pharmacy>,
    @InjectRepository(Medicine)
    private medicinesRepository: Repository<Medicine>,
  ) {}

  async get(id: number) {
    return await this.pharmaciesRepository.findOne(id);
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
  async update(updatePharmacyDto: UpdatePharmacyDto) {
    const currentObject = await this.pharmaciesRepository.findOne(
      updatePharmacyDto.id,
    );
    if (!currentObject) {
      throw new NotFoundException('해당 약국이 존재하지 않습니다.');
    }
    const newMedicines = await this.medicinesRepository.find({
      where: { id: In(updatePharmacyDto.medicines) },
    });
    return this.pharmaciesRepository.save({
      ...updatePharmacyDto,
      medicines: newMedicines,
    });
  }
}
