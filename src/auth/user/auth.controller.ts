import { UseInstagramAuth } from '@nestjs-hybrid-auth/instagram';
import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('/facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  facebookCallBack(@Req() req) {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  loginFacebook(@Req() req) {
    return HttpStatus.OK;
  }

  @Get('/instagram/callback')
  @UseInstagramAuth()
  instagramCallBack(@Req() req) {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }

  @Get('/instagram')
  @UseInstagramAuth()
  @UseGuards(AuthGuard('instagram'))
  loginInstagram(@Req() req) {
    return HttpStatus.OK;
  }
}
