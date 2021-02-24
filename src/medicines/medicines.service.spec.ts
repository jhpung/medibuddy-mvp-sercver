import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Medicine } from '../entities/medicine.entity';
import { MedicineRepository } from '../repositories/medicine.repository';
import { MedicinesModule } from './medicines.module';
import { MedicinesService } from './medicines.service';

describe('MedicinesService', () => {
  let service: MedicinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MedicinesModule],
      providers: [
        MedicinesService,
        { provide: 'MedicineRepository', useClass: MedicineRepository },
      ],
    }).compile();

    service = module.get<MedicinesService>(MedicinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
