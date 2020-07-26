import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Recipient from './Recipient';
import Courier from './Courier';
import File from './File';

@Entity('packages')
class Package {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  recipient_id: number;

  @ManyToOne(() => Recipient)
  @JoinColumn({ name: 'recipient_id' })
  recipient: Recipient;

  @Column({ nullable: true })
  courier_id: number;

  @ManyToOne(() => Courier)
  @JoinColumn({ name: 'courier_id' })
  courier: Courier;

  @Column({ nullable: true })
  signature_id: number;

  @OneToOne(() => File)
  @JoinColumn({ name: 'signature_id' })
  signature: File;

  @Column()
  product: string;

  @Column('timestamp', { nullable: true })
  canceled_at: Date;

  @Column('timestamp', { nullable: true })
  start_date: Date;

  @Column('timestamp', { nullable: true })
  end_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Package;
