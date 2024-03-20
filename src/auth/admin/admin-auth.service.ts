import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-facebook';
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  // Existing register and login methods...

  async validateFacebookUser(
    profile: Profile,
    token: string,
    refreshToken: string,
  ) {
    let admin = await this.adminRepository.findOneBy({
      facebookId: profile.id,
    });
    if (!admin) {
      // Create a new user if not existing
      admin = new Admin();
      admin.username = profile.username;
      admin.facebookId = profile.id;
      admin.token = token;
      admin.refreshToken = refreshToken;
      // Consider adding email from profile.emails if available

      admin = await this.adminRepository.save(admin);
    }

    return {
      id: admin.facebookId,
    };
  }
}
