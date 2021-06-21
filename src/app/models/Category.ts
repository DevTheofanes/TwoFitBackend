import 'reflect-metadata';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  subcategory: string;

  @Column()
  background_url: string;

  @Column()
  created_at: Date;
}
