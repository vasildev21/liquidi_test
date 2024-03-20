import { Controller, Get, UseGuards } from '@nestjs/common';
import { InstagramService } from './instagram.service';

@Controller('insights')
export class InsightsController {
  constructor(private readonly instagramService: InstagramService) {}

  @Get('likes')
  async getLikes() {
    const data = await this.instagramService.getInsights('id');
    return data;
  }
}
