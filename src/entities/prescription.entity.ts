import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Treatment } from './treatment.entity';

@Entity()
export class Prescription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @ManyToOne((type) => Treatment, (treatment) => treatment.id, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn()
  treatment: Treatment;

  constructor(prescription: Partial<Prescription>) {
    Object.assign(this, prescription);
  }
}
