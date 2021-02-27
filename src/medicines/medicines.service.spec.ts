import { Test, TestingModule } from '@nestjs/testing';
import { MedicineRepository } from '../models/repositories/medicine.repository';
import { MedicinesService } from './medicines.service';

describe('MedicinesService', () => {
  let service: MedicinesService;
  let medicineRepository: MedicineRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicinesService,
        { provide: 'MedicineRepository', useClass: MedicineRepository },
      ],
    }).compile();

    service = module.get<MedicinesService>(MedicinesService);
    medicineRepository = module.get<MedicineRepository>(MedicineRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(medicineRepository).toBeDefined();
  });
});
