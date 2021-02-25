import { Repository } from 'typeorm';
import { Pharmacy } from '../entities/pharmacy.entity';

export class PharmacyRepository extends Repository<Pharmacy> {}
