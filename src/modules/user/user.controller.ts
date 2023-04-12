import { Controller, Get, Param } from '@nestjs/common';

@Controller({ version: '1' })
export class UserController {
  @Get('profile')
  // TODO remove any
  async getProfile(@Param('token') token: string): Promise<any> {
    return token;
  }
}
