import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { PharmaciesService } from './pharmacies.service';

@ApiTags('pharmacies')
@Controller('pharmacies')
export class PharmaciesController {
  constructor(private pharmaciesService: PharmaciesService) {}

  @Get(':id')
  async get(id: number) {
    return await this.pharmaciesService.get(id);
  }

  @Get()
  async getPharmacies(
    @Query('page') page: number,
    @Query('count') count: number,
    @Query('orderBy') orderBy: string,
    @Query('method') method: 'ASC' | 'DESC',
  ) {
    return await this.pharmaciesService.getPharmacies(
      page,
      count,
      orderBy,
      method,
    );
  }

  @Post()
  async create(@Body() createPharmacyDto: CreatePharmacyDto) {
    return await this.pharmaciesService.create(createPharmacyDto);
  }

  @Put()
  async update(@Body() updatePharmacyDto: UpdatePharmacyDto) {
    return await this.pharmaciesService.update(updatePharmacyDto);
  }
}
