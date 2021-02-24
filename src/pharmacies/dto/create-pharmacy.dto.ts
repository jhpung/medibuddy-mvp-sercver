import { ApiProperty } from '@nestjs/swagger';

export class CreatePharmacyDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  fax: string;
}
