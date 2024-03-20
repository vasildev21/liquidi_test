import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { AuthController } from './auth/user/auth.controller';
import { InstagramModule } from './instagram/instagram.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PostsModule } from './posts/post.module';
import { WebhookModule } from './webhooks/webhook.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    InstagramModule,
    PostsModule,
    WebhookModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
