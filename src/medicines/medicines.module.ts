import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicine } from '../models/entities/medicine.entity';
import { Pharmacy } from '../models/entities/pharmacy.entity';

import { MedicinesController } from './medicines.controller';
import { MedicinesService } from './medicines.service';

@Module({
  imports: [TypeOrmModule.forFeature([Medicine, Pharmacy])],
  controllers: [MedicinesController],
  providers: [MedicinesService],
})
export class MedicinesModule {}
