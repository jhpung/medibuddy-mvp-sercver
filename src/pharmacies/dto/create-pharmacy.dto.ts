import { ApiProperty } from '@nestjs/swagger';

export class CreatePharmacyDto {
  @ApiProperty({ description: '약국 이름' })
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  fax: string;
}
