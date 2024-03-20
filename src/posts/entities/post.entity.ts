import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt'; // For password hashing

export interface PostConstructorParams {
  id?: number;
  post_fb_id?: string;
  message?: string;
  created_time?: string;
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  post_fb_id: string;

  @Column({ nullable: true, unique: true })
  message: string;

  @Column({ nullable: true, unique: true })
  created_time: string;

  constructor(value: PostConstructorParams) {
    this.id = value?.id;
    this.message = value?.message;
    this.post_fb_id = value?.post_fb_id;
    this.created_time = value?.created_time;
  }
}
