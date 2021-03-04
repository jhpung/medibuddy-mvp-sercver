import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Medicine } from './medicine.entity';
import { Treatment } from './treatment.entity';

@Entity()
export class Pharmacy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  fax: string;

  @OneToMany(() => Medicine, (medicine) => medicine.pharmacy)
  medicines: Medicine[];

  @OneToMany(() => Treatment, (treatment) => treatment.pharmacy)
  treatments: Treatment[];

  constructor(pharmacy: Partial<Pharmacy>) {
    Object.assign(this, pharmacy);
  }
}
