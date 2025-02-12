import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column('simple-json')
  coordinates: { lat: number; lng: number };

  @Column()
  mileage: number;

  // Relation - causes changes to the db
  @ManyToOne(() => User, (user) => user.reports)
  ownerId: User;
}
