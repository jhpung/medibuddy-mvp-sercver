import { ApiProperty } from '@nestjs/swagger';

export class UpdateTreatmentDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  isFirst?: boolean;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  residentRegistrationNumber?: string;

  @ApiProperty({ required: false })
  age?: number;

  @ApiProperty({ required: false })
  symptom?: string;

  @ApiProperty({ required: false })
  patientRequest?: string;

  @ApiProperty({ required: false })
  price?: string;

  @ApiProperty({ required: false })
  status?: string;

  @ApiProperty({ required: false })
  pharmacy: number;

  @ApiProperty({ required: false })
  prescription?: string;
}
