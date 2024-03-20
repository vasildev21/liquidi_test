import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { AuthService } from './auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,

      callbackURL:
        process.env.FACEBOOK_CALLBACK_URL ||
        'http://localhost:5000/auth/facebook/callback', // Update with your callback URL
      profileFields: ['id', 'displayName', 'emails'], // Fields to retrieve from Facebook profile
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails } = profile;

    const user = {
      id: profile.id,
      email: emails?.length ? emails[0]?.value : null,
      username: profile.username,
      displayName: profile.displayName,
      token: accessToken,
      refreshToken: refreshToken,
    };

    const { access_token } = await this.authService.validateFacebookUser(
      profile,
      accessToken,
      refreshToken,
    );

    const payload = {
      user,
      accessToken: access_token,
    };

    done(null, payload);
  }
}
