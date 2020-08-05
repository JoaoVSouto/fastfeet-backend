import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Package from './Package';

@Entity('delivery_problems')
class DeliveryProblem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  package_id: number;

  @ManyToOne(() => Package)
  @JoinColumn({ name: 'package_id' })
  package: Package;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default DeliveryProblem;
