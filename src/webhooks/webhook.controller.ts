import { Controller, Get, HttpService, UseGuards } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Controller('/webhook')
export class WebhookController {
  constructor(private readonly httpService: HttpService) {}

  @Get('likes')
  async getLikes() {
    const url = `https://fb-app-test-webhook-449735f20986.herokuapp.com/`;
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
