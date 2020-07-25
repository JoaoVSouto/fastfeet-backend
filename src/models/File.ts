import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
} from 'typeorm';

@Entity('files')
class File {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  path: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  url: string;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  setUrl(): void {
    this.url = `http://localhost:3333/files/${this.path}`;
  }
}

export default File;
