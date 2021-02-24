import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { PrescriptionsService } from './prescriptions.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';

@ApiTags('prescriptions')
@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private prescriptionsService: PrescriptionsService) {}

  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.prescriptionsService.get(id);
  }

  @Get()
  async getPrescriptions(
    @Query('page') page: number,
    @Query('count') count: number,
    @Query('orderBy') orderBy: string,
    @Query('method') method: 'ASC' | 'DESC',
  ) {
    return await this.prescriptionsService.paging(page, count, orderBy, method);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   type: 'multipart/form-data',
  //   required: true,
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       file: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
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
  @ApiBody({ type: CreatePrescriptionDto })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPrescriptionDto: CreatePrescriptionDto,
  ) {
    return await this.prescriptionsService.create(
      {
        ...createPrescriptionDto,
      },
      file,
    );
  }

  @Get('file/:path')
  async downloadPrescription(
    @Res() res: Response,
    @Param('path') path: string,
  ) {
    console.log(path);
    return res.download(path);
  }
}
