import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class InstagramService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getInsights(metricName: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ id: 1 });
    const url = `https://graph.facebook.com/v14.0/2682176381937164_2653361411485328/reactions?access_token=${user.token}`;
    const { data } = await firstValueFrom(
      this.httpService.get(url).pipe(
        catchError((error: AxiosError) => {
          console.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
}
