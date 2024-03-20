import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { AuthService } from '../user/auth.service';
import { AdminAuthService } from './admin-auth.service';
import { PostService } from 'src/posts/post.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FacebookLoginSuccessEvent } from '../events/facebook.envent';

@Injectable()
export class FacebookAdminStrategy extends PassportStrategy(
  Strategy,
  'admin-facebook',
) {
  constructor(
    private readonly adminAuthService: AdminAuthService,

    private eventEmitter: EventEmitter2,
    private readonly postService: PostService,
  ) {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL:
        process.env.FACEBOOK_CALLBACK_URL ||
        'http://localhost:5000/admin/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'email', 'photos', 'posts', 'likes'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails, posts } = profile;
    console.log(profile._json.posts);

    const user = {
      id: profile.id,
      email: emails?.length ? emails[0]?.value : null,
      username: profile.username,
      displayName: profile.displayName,
      token: accessToken,
      refreshToken: refreshToken,
    };

    await this.adminAuthService.validateFacebookUser(
      profile,
      accessToken,
      refreshToken,
    );

    const payload = {
      user,
    };

    this.eventEmitter.emit(
      'facebook.login',
      new FacebookLoginSuccessEvent(profile),
    );

    done(null, payload);
  }
}
