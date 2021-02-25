import { Repository } from 'typeorm';
import { Treatment } from '../entities/treatment.entity';

export class TreatmentRepository extends Repository<Treatment> {}
