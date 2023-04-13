import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller({
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<object> {
    return await this.authService.registerUser(registerUserDto);
  }
}
