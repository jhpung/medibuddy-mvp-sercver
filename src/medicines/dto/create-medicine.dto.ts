import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicineDto {
  @ApiProperty({ description: '약국번호' })
  pharmacy: number;

  @ApiProperty({ description: '의약품명' })
  name: string;

  @ApiProperty({ description: '성분명' })
  ingredients: string;
}
