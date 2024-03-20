import { Module } from '@nestjs/common';
import { AuthService } from './user/auth.service';
import { FacebookStrategy } from './user/facebook.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacebookAdminStrategy } from './admin/facebook-admin.strategy';
import { AdminAuthController } from './admin/admin-auth.controller';
import { AdminAuthService } from './admin/admin-auth.service';
import { Admin } from 'src/admin/entities/admin.entity';
import { InstagramStrategy } from './user/instagram.strategy';
import { InstagramAuthModule } from '@nestjs-hybrid-auth/instagram';
import { FacebookLoginSuccessEvent } from './events/facebook.envent';
import { FacebookLoginSuccessListener } from './listeners/facebook.listener';
import { Post } from 'src/posts/entities/post.entity';
import { PostService } from 'src/posts/post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Admin, Post]),
    PassportModule,

    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' }, // 1 hour expiration time
    }),
  ],
  controllers: [AdminAuthController],
  providers: [
    AuthService,
    AdminAuthService,
    FacebookStrategy,
    InstagramStrategy,
    FacebookAdminStrategy,
    FacebookLoginSuccessEvent,
    FacebookLoginSuccessListener,
    PostService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
