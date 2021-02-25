import { ApiProperty } from '@nestjs/swagger';

export class UpdatePharmacyDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  fax?: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'number',
    },
  })
  medicines: number[];
}
