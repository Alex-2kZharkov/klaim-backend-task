import { Body, Controller, Post, UseGuards, Request, HttpCode, Delete } from '@nestjs/common';

import { RegisterUserDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthenticatedRequest } from '../../core/request';
import { AuthenticationGuard, LocalAuthenticationGuard } from '../../core/guard';
import { EXPIRED_SESSION_VALUE } from '../../constants';

@Controller({
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<void> {
    await this.authService.registerUser(registerUserDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('/login')
  async login(@Request() request: AuthenticatedRequest): Promise<{ token: string }> {
    return { token: request.session.id };
  }

  @Delete('/logout')
  @UseGuards(AuthenticationGuard)
  async logout(@Request() request: AuthenticatedRequest): Promise<void> {
    request.logOut(() => console.log('Session has been terminated'));
    request.session.cookie.maxAge = EXPIRED_SESSION_VALUE;
  }
}
