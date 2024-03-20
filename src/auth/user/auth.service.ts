import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-facebook';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // Existing register and login methods...

  async validateFacebookUser(
    profile: Profile,
    token: string,
    refreshToken: string,
  ) {
    let user = await this.userRepository.findOneBy({ facebookId: profile.id });
    if (!user) {
      // Create a new user if not existing
      user = new User();
      user.username = profile.username;
      user.facebookId = profile.id;
      user.token = token;
      user.refreshToken = refreshToken;
      // Consider adding email from profile.emails if available
      console.log(user);
      user = await this.userRepository.save(user);
    }
    // Generate and return JWT
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async validateInstagramUser(
    profile: Profile,
    token: string,
    refreshToken: string,
  ) {
    let user = await this.userRepository.findOneBy({ instagramId: profile.id });
    if (!user) {
      // Create a new user if not existing
      user = new User();
      user.username = profile.username;
      user.instagramId = profile.id;
      user.token = token;
      user.refreshToken = refreshToken;
      // Consider adding email from profile.emails if available
      console.log(user);
      user = await this.userRepository.save(user);
    }
    // Generate and return JWT
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
