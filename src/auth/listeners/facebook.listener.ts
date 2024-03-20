import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FacebookLoginSuccessEvent } from '../events/facebook.envent';
import { PostService } from 'src/posts/post.service';
import { Post } from 'src/posts/entities/post.entity';

@Injectable()
export class FacebookLoginSuccessListener {
  constructor(private readonly postService: PostService) {}
  @OnEvent('facebook.login')
  handleFacebookLoginSuccessEvent(payload: FacebookLoginSuccessEvent) {
    const data = payload.profile._json.posts;
    const posts = data.map((item) => {
      new Post({
        post_fb_id: item.id,
        message: item.message,
        created_time: item.created_time,
      });
    });
    this.postService.save(posts);
  }
}
