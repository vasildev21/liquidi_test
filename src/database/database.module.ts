import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: 'root',
      password: 'password',
      database: 'test',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {
  constructor() {
    console.log(
      process.env.DATABASE_HOST,
      process.env.DATABASE_USERNAME,
      process.env.DATABASE_PASSWORD,
      process.env.DATABASE_NAME,
    );
  }
}
