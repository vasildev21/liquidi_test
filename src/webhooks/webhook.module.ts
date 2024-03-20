import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookController } from './webhook.controller';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([User])],
  controllers: [WebhookController],
})
export class WebhookModule {}
