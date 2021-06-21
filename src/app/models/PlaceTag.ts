import 'reflect-metadata';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('placeTags')
export class PlaceTag {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  icon_url: string;

  @Column()
  place_id: string;

  @Column()
  created_at: Date;
}
