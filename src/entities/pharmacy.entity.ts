import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @JoinTable()
  @ManyToMany(() => Medicine, (medicine) => medicine.id, {
    cascade: true,
  })
  medicines: Medicine[];

  @OneToMany(() => Treatment, (treatment) => treatment.id)
  treatments: Treatment[];

  constructor(pharmacy: Partial<Pharmacy>) {
    Object.assign(this, pharmacy);
  }
}
