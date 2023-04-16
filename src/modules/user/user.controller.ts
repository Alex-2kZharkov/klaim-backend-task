import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { AuthenticatedRequest } from '../../core/request';
import { AuthenticationGuard } from '../../core/guard';
import { UserProfile } from './user.types';
import { UserService } from './user.service';

@Controller({ version: '1' })
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/profile')
  @UseGuards(AuthenticationGuard)
  async getProfile(
    @Request() { user: { firstName, lastName, email } }: AuthenticatedRequest,
  ): Promise<UserProfile> {
    return { fullname: this.userService.getFullname({ firstName, lastName }, ' '), email };
  }
}
