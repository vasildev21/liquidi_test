import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin/auth')
export class AdminAuthController {
  @Get('/facebook/callback')
  @UseGuards(AuthGuard('admin-facebook'))
  facebookCallBack(@Req() req) {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('admin-facebook'))
  loginFacebook(@Req() req) {
    return HttpStatus.OK;
  }
}
