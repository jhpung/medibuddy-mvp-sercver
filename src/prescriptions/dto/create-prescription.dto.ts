import { ApiProperty } from '@nestjs/swagger';

export class CreatePrescriptionDto {
  @ApiProperty()
  treatment: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
