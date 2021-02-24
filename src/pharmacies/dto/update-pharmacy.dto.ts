import { ApiProperty } from '@nestjs/swagger';

export class UpdatePharmacyDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  fax?: string;

  @ApiProperty()
  medicines: number[];
}
