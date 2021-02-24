import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pharmacy } from './pharmacy.entity';

@Entity()
export class Medicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Pharmacy, (pharmacy) => pharmacy.id)
  pharmacies: Pharmacy[];

  constructor(medicine: Partial<Medicine>) {
    Object.assign(this, medicine);
  }
}
