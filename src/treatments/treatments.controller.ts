import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { UploadPrescriptionDto } from './dto/upload-prescription.dto';
import { TreatmentsService } from './treatments.service';

@ApiTags('treatments')
@ApiResponse({ status: 500, description: '알 수 없는 에러' })
@Controller('treatments')
export class TreatmentsController {
  constructor(private treatmentsService: TreatmentsService) {}

  @Get(':id')
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 404, description: '존재하지 않는 진료 번호일 경우' })
  async get(@Param('id') id: number) {
    return await this.treatmentsService.get(id);
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
  async getPrescriptions(
    @Query('page') page: number,
    @Query('count') count: number,
    @Query('orderBy') orderBy: string,
    @Query('method') method: 'ASC' | 'DESC',
  ) {
    return await this.treatmentsService.paging(page, count, orderBy, method);
  }

  @Post()
  @ApiResponse({ status: 201, description: '성공' })
  async create(@Body() createTreatmentDto: CreateTreatmentDto) {
    return await this.treatmentsService.create(createTreatmentDto);
  }

  @Put(':id')
  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({
    status: 404,
    description: '존재하지 않는 진료요청 / 약국일 경우',
  })
  async update(
    @Param('id') id: number,
    @Body() updateTreatmentDto: UpdateTreatmentDto,
  ) {
    return await this.treatmentsService.update(id, updateTreatmentDto);
  }

  @Put(':id/prescription')
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 404, description: '존재하지 않는 진료기록일 경우' })
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './uploads',
      preservePath: true,
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, Date.now().toString() + file.originalname);
        },
      }),
    }),
  )
  @ApiBody({ type: UploadPrescriptionDto })
  async uploadPrescription(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadPrescriptionDto: UploadPrescriptionDto,
    @Param('id') id: number,
  ) {
    return await this.treatmentsService.uploadPrescription(
      file,
      uploadPrescriptionDto,
      id,
    );
  }
}
