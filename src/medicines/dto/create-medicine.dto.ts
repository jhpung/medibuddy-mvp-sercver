import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicineDto {
  @ApiProperty({ description: '의약품명' })
  name: string;
}
