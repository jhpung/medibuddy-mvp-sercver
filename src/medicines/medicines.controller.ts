import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { MedicinesService } from './medicines.service';

@ApiTags('medicines')
@Controller('medicines')
export class MedicinesController {
  constructor(private medicinesService: MedicinesService) {}

  @Get(':id')
  async get(id: number) {
    return await this.medicinesService.getMedicine(id);
  }

  @Get()
  async getMedicines(
    @Query('page') page: number,
    @Query('count') count: number,
    @Query('orderBy') orderBy: string,
    @Query('method') method: 'ASC' | 'DESC',
    @Query('name') name: string | null,
  ) {
    return await this.medicinesService.getMedicines(
      page,
      count,
      orderBy,
      method,
      name,
    );
  }

  @Post()
  async create(@Body() createMedicineDto: CreateMedicineDto) {
    return await this.medicinesService.create(createMedicineDto);
  }
}
