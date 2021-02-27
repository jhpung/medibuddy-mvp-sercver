import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Pharmacy } from '../models/entities/pharmacy.entity';
import { Treatment } from '../models/entities/treatment.entity';
import { PharmacyRepository } from '../models/repositories/pharmacy.repository';
import { TreatmentRepository } from '../models/repositories/treatment.repository';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { UploadPrescriptionDto } from './dto/upload-prescription.dto';
import { TreatmentsService } from './treatments.service';

const mockFile = {
  path: 'test',
  originalname: 'test',
  fieldname: 'test',
  encoding: 'test',
  mimetype: 'test',
  stream: null,
  size: 0,
  filename: 'test',
  destination: 'test',
  buffer: null,
};
const treatment = new Treatment({
  id: 1,
  name: 'test',
  isFirst: true,
  phone: 'test',
  residentRegistrationNumber: 'test',
  age: 25,
  symptom: 'test',
  status: 'test',
  patientRequest: 'test',
  price: '1000',
  prescription: 'test',
  created: new Date(),
  updated: new Date(),
  pharmacy: null,
});

const treatmentArray = [
  new Treatment({
    id: 1,
    name: 'test',
    isFirst: true,
    phone: 'test',
    residentRegistrationNumber: 'test',
    age: 25,
    symptom: 'test',
    status: 'test',
    patientRequest: 'test',
    price: '1000',
    prescription: 'test',
    created: new Date(),
    updated: new Date(),
    pharmacy: null,
  }),
  new Treatment({
    id: 1,
    name: 'test',
    isFirst: true,
    phone: 'test',
    residentRegistrationNumber: 'test',
    age: 25,
    symptom: 'test',
    status: 'test',
    patientRequest: 'test',
    price: '1000',
    prescription: 'test',
    created: new Date(),
    updated: new Date(),
    pharmacy: null,
  }),
  new Treatment({
    id: 1,
    name: 'test',
    isFirst: true,
    phone: 'test',
    residentRegistrationNumber: 'test',
    age: 25,
    symptom: 'test',
    status: 'test',
    patientRequest: 'test',
    price: '1000',
    prescription: 'test',
    created: new Date(),
    updated: new Date(),
    pharmacy: null,
  }),
  new Treatment({
    id: 1,
    name: 'test',
    isFirst: true,
    phone: 'test',
    residentRegistrationNumber: 'test',
    age: 25,
    symptom: 'test',
    status: 'test',
    patientRequest: 'test',
    price: '1000',
    prescription: 'test',
    created: new Date(),
    updated: new Date(),
    pharmacy: null,
  }),
];
describe('TreatmentsService', () => {
  let service: TreatmentsService;
  let treatmentRepository: TreatmentRepository;
  let pharmacyRepository: PharmacyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TreatmentsService,
        {
          provide: getRepositoryToken(Treatment),
          useValue: {
            find: jest.fn().mockResolvedValue(treatmentArray),
            findOne: jest.fn().mockResolvedValue(treatment),
            findOneOrFail: jest.fn().mockResolvedValue(treatment),
            create: jest.fn().mockReturnValue(treatment),
            save: jest.fn().mockResolvedValue(treatment),
            update: jest.fn().mockResolvedValue(treatment),
          },
        },
        {
          provide: getRepositoryToken(Pharmacy),
          useValue: {
            find: jest.fn().mockResolvedValue(treatmentArray),
            findOne: jest.fn().mockResolvedValue(treatment),
            findOneOrFail: jest.fn().mockResolvedValue(treatment),
            create: jest.fn().mockReturnValue(treatment),
            save: jest.fn().mockReturnValue(treatment),
          },
        },
      ],
    }).compile();

    service = module.get<TreatmentsService>(TreatmentsService);
  });

  it('서비스가 정의되어야 한다.', () => {
    expect(service).toBeDefined();
  });
  describe('진료정보 모두 가져오기', () => {
    it('진료정보 목록을 반환해야 한다.', async () => {
      const treatments = await service.paging(0, 10, 'id', 'ASC');
      expect(treatments).toEqual(treatmentArray);
    });
  });
  describe('진료정보 가져오기', () => {
    it('진료정보을 반환해야 한다.', async () => {
      const result = await service.get(1);
      expect(result).toEqual(treatment);
    });
  });
  describe('진료정보 생성하기', () => {
    it('생성한 진료정보을 반환해야 한다.', async () => {
      const result = await service.create(new CreateTreatmentDto());
      expect(result).toEqual(treatment);
    });
  });
  describe('진료정보 수정하기', () => {
    it('수정된 진료정보을 반환해야 한다.', async () => {
      const result = await service.update(0, new UpdateTreatmentDto());
      expect(result).toEqual(treatment);
    });
  });
  describe('처방전 등록하기', () => {
    it('처방전 경로가 추가된 진료정보를 반환해야 한다.', async () => {
      const result = await service.uploadPrescription(
        mockFile,
        new UploadPrescriptionDto(),
        0,
      );
      expect(result).toEqual(treatment);
    });
  });
});
