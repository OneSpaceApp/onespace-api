import { Controller, Get, Post, Version, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('signup')
  @Version('1')
  signUpV1(@Body() body) {
    return body;
  }

  @Post('verify')
  @Version('1')
  verifyV1(@Body() body) {
    return body;
  }

  @Post('postSignup')
  @Version('1')
  postSignUpV1(@Body() body) {
    return body;
  }

  @Post('signin')
  @Version('1')
  signInV1(@Body() body) {
    return body;
  }

  @Get('signout')
  @Version('1')
  signOutV1(@Body() body) {
    return body;
  }
}
