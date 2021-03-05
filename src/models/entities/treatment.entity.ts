import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pharmacy } from './pharmacy.entity';

@Entity()
export class Treatment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  isViewed: boolean;

  @Column()
  isFirst: boolean;

  @Column()
  phone: string;

  @Column()
  residentRegistrationNumber: string;

  @Column()
  age: number;

  @Column()
  symptom: string;

  @Column()
  status: string;

  @Column()
  patientRequest: string;

  @Column({ nullable: true })
  price: string;

  @Column({ nullable: true })
  prescription: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(() => Pharmacy, (pharmacy) => pharmacy.id)
  pharmacy: Pharmacy;

  constructor(treatment: Partial<Treatment>) {
    Object.assign(this, treatment);
  }
}
