import { Test, TestingModule } from '@nestjs/testing';
import { MedicineRepository } from '../models/repositories/medicine.repository';
import { PharmacyRepository } from '../models/repositories/pharmacy.repository';
import { PharmaciesService } from './pharmacies.service';

describe('PharmaciesService', () => {
  let service: PharmaciesService;
  let pharmacyRepository: PharmacyRepository;
  let medicineRepository: MedicineRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PharmaciesService,
        { provide: 'PharmacyRepository', useClass: PharmacyRepository },
        { provide: 'MedicineRepository', useClass: MedicineRepository },
      ],
    }).compile();

    service = module.get<PharmaciesService>(PharmaciesService);
    pharmacyRepository = module.get<PharmacyRepository>(PharmacyRepository);
    medicineRepository = module.get<MedicineRepository>(MedicineRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(pharmacyRepository).toBeDefined();
    expect(medicineRepository).toBeDefined();
  });
});
