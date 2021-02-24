import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pharmacy } from './pharmacy.entity';
import { Prescription } from './prescription.entity';

@Entity()
export class Treatment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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

  @ManyToOne(() => Pharmacy, (pharmacy) => pharmacy.id)
  pharmacy: Pharmacy;

  @Column()
  status: string;

  @Column()
  patientRequest: string;

  @Column({ nullable: true })
  price: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  constructor(treatment: Partial<Treatment>) {
    Object.assign(this, treatment);
  }

  @OneToOne((type) => Prescription, (prescription) => prescription.id, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  prescription: Prescription;
}
