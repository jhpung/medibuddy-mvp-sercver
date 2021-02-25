import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { MedicinesService } from './medicines.service';

@ApiTags('medicines')
@ApiResponse({ status: 500, description: '알 수 없는 에러' })
@Controller('medicines')
export class MedicinesController {
  constructor(private medicinesService: MedicinesService) {}

  @Get(':id')
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 404, description: '해당하는 약 찾지 못함' })
  async get(@Param('id') id: number) {
    return await this.medicinesService.getMedicine(id);
  }

  @Get()
  @ApiResponse({ status: 200, description: '성공' })
  @ApiQuery({ type: 'number', name: 'page', description: '페이지 번호' })
  @ApiQuery({
    type: 'number',
    name: 'count',
    description: '페이지 당 진료요청 갯수',
  })
  @ApiQuery({
    type: 'string',
    name: 'orderBy',
    description: '정렬 기준이 될 컬럼명',
    examples: {
      1: { summary: '번호순', value: 'id' },
      2: { summary: '이름순', value: 'name' },
      3: { summary: '요청시간순', value: 'created' },
    },
  })
  @ApiQuery({
    type: 'string',
    name: 'method',
    description: '정렬방법',
    examples: {
      1: { summary: '오름차순 정렬', value: 'ASC' },
      2: { summary: '내림차순 정렬', value: 'DESC' },
    },
  })
  async getMedicines(
    @Query('page')
    page: number,
    @Query('count') count: number,
    @Query('orderBy') orderBy: string,
    @Query('method') method: 'ASC' | 'DESC',
  ) {
    return await this.medicinesService.getMedicines(
      page,
      count,
      orderBy,
      method,
    );
  }

  @Post()
  @ApiResponse({ status: 201, description: '성공적으로 생성됨' })
  @ApiResponse({ status: 409, description: '이미 존재하는 의약품 이름일 경우' })
  async create(@Body() createMedicineDto: CreateMedicineDto) {
    return await this.medicinesService.create(createMedicineDto);
  }
}
