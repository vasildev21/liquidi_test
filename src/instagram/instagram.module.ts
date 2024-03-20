import { Module } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { HttpModule } from '@nestjs/axios';
import { InsightsController } from './instagram.controller';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([User])],
  controllers: [InsightsController],
  providers: [InstagramService],
})
export class InstagramModule {}
