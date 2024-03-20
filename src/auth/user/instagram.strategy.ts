import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-instagram';
import { AuthService } from './auth.service';

@Injectable()
export class InstagramStrategy extends PassportStrategy(Strategy, 'instagram') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.INSTAGRAM_APP_ID,
      clientSecret: process.env.INSTAGRAM_APP_SECRET,
      callbackURL: process.env.INSTAGRAM_APP_CALLBACK,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails } = profile;

    console.log(profile);
    const user = {
      id: profile.id,
      email: emails?.length ? emails[0]?.value : null,
      username: profile.username,
      displayName: profile.displayName,
      token: accessToken,
      refreshToken: refreshToken,
    };

    const { access_token } = await this.authService.validateInstagramUser(
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
