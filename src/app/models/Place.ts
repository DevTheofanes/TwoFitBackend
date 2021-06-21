import 'reflect-metadata';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('places')
export class Place {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  stars_mean: string;

  @Column()
  description: string;

  @Column()
  created_at: Date;
}
