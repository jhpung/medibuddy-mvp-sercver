import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { TreatmentsService } from './treatments.service';

@ApiTags('treatments')
@Controller('treatments')
export class TreatmentsController {
  constructor(private treatmentsService: TreatmentsService) {}

  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.treatmentsService.get(id);
  }

  @Get()
  async getPrescriptions(
    @Query('page') page: number,
    @Query('count') count: number,
    @Query('orderBy') orderBy: string,
    @Query('method') method: 'ASC' | 'DESC',
  ) {
    return await this.treatmentsService.paging(page, count, orderBy, method);
  }

  @Post()
  async create(@Body() createTreatmentDto: CreateTreatmentDto) {
    return await this.treatmentsService.create(createTreatmentDto);
  }

  @Put()
  async update(@Body() updateTreatmentDto: UpdateTreatmentDto) {
    return await this.treatmentsService.update(updateTreatmentDto);
  }
}
