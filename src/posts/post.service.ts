import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}
  async save(value: Post[]);
  async save(value: Post);
  async save(value: Post | Post[]) {
    if (!Array.isArray(value)) {
      value = [value];
    }

    await this.postRepository.save(value);
  }
}
