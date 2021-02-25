import { ApiProperty } from '@nestjs/swagger';

export class UploadPrescriptionDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
