import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
