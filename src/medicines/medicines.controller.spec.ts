import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicine } from '../models/entities/medicine.entity';
import { MedicinesController } from './medicines.controller';
import { MedicinesService } from './medicines.service';

describe('MedicinesController', () => {
  let controller: MedicinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Medicine])],
      controllers: [MedicinesController],
      providers: [MedicinesService],
    }).compile();

    controller = module.get<MedicinesController>(MedicinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
