import { Report } from 'src/reports/reports.entity';
import {
  AfterInsert,
  AfterUpdate,
  BeforeRemove,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;

  // The function resolves the problem of the report/user being not
  // yet defined, and avoiding circular dependency issue
  @OneToMany(() => Report, (report) => report.owner)
  reports: Report[];

  // Logs
  @AfterInsert()
  logInsert() {
    console.log('Inserted user with id:', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with id:', this.id);
  }

  @BeforeRemove()
  logRemove() {
    console.log('Removed user with id:', this.id);
  }
}
