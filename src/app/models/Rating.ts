import 'reflect-metadata';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('ratings')
export class Rating {
  @PrimaryColumn()
  id: string;

  @Column()
  place_id: string;

  @Column()
  user_author: string;

  @Column()
  stars: string;

  @Column()
  comments: string;

  @Column()
  created_at: Date;
}
