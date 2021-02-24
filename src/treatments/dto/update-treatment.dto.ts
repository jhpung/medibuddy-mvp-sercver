import { ApiProperty } from '@nestjs/swagger';

export class UpdateTreatmentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  isFirst?: boolean;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  residentRegistrationNumber?: string;

  @ApiProperty()
  age?: number;

  @ApiProperty()
  symptom?: string;

  @ApiProperty()
  patientRequest?: string;

  @ApiProperty()
  price?: string;

  @ApiProperty()
  status?: string;

  @ApiProperty()
  pharmacy: number;

  @ApiProperty()
  prescription?: number;
}
