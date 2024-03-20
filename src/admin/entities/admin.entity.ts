import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt'; // For password hashing

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true, unique: true })
  instagramId: string;

  @Column({ nullable: true, unique: true })
  facebookId: string;

  @Column({ nullable: true, unique: true })
  token: string;

  @Column({ nullable: true, unique: true })
  refreshToken: string;
}
