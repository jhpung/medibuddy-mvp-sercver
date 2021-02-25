import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { PharmaciesService } from './pharmacies.service';

@ApiTags('pharmacies')
@ApiResponse({ status: 500, description: '알 수 없는 에러' })
@Controller('pharmacies')
export class PharmaciesController {
  constructor(private pharmaciesService: PharmaciesService) {}

  @Get(':id')
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 404, description: '존재하니 않는 약국 번호일 경우' })
  async get(@Param('id') id: number) {
    return await this.pharmaciesService.get(id);
  }

  @Get()
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
  @ApiResponse({ status: 200, description: '성공' })
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
  @ApiResponse({ status: 201, description: '성공적으로 생성됨' })
  async create(@Body() createPharmacyDto: CreatePharmacyDto) {
    return await this.pharmaciesService.create(createPharmacyDto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: '성공적으로 수정됨' })
  @ApiResponse({ status: 404, description: '존재하지 않는 약국일 경우' })
  async update(
    @Param('id') id: number,
    @Body() updatePharmacyDto: UpdatePharmacyDto,
  ) {
    return await this.pharmaciesService.update(id, updatePharmacyDto);
  }
}
