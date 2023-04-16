import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user';
import { PrismaService } from '../../database';
import { LocalStrategy } from './auth.local.strategy';
import { AuthSerializer } from './auth.serializer';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, AuthSerializer, LocalStrategy, UserService, PrismaService],
})
export class AuthModule {}
