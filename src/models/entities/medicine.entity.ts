import {
  Column,
  DeepPartial,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pharmacy } from './pharmacy.entity';

@Entity()
export class Medicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  ingredients: string;

  @ManyToOne(() => Pharmacy, (pharmacy) => pharmacy.id)
  @JoinColumn()
  pharmacy: Pharmacy;

  constructor(medicine: DeepPartial<Medicine>) {
    Object.assign(this, medicine);
  }
}
