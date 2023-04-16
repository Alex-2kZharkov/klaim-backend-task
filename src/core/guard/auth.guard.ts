import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}

@Injectable()
export class LocalAuthenticationGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    await super.logIn(context.switchToHttp().getRequest());

    return true;
  }
}
