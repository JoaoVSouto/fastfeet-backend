import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('recipients')
class Recipient {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  address_street: string;

  @Column()
  address_number: number;

  @Column({ nullable: true })
  address_complement: string;

  @Column({ length: 8 })
  address_cep: string;

  @Column({ length: 2 })
  uf: string;

  @Column()
  city: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Recipient;
