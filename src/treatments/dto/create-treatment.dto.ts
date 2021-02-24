import { ApiProperty } from '@nestjs/swagger';

export class CreateTreatmentDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  isFirst: boolean;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  residentRegistrationNumber: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  symptom: string;

  @ApiProperty()
  pharmacy: number;

  @ApiProperty()
  patientRequest: string;

  @ApiProperty()
  status: string;
}
