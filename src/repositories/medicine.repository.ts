import { Repository } from 'typeorm';
import { Medicine } from '../entities/medicine.entity';

export class MedicineRepository extends Repository<Medicine> {}
