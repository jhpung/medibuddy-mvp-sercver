import { ApiProperty } from '@nestjs/swagger';

export class UpdatePharmacyDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  fax?: string;

  @ApiProperty({
    required: false,
    type: 'array',
    items: {
      type: 'number',
    },
  })
  medicines: number[];
}
