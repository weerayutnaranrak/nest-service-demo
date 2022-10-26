import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AUTH_TYPE } from 'src/constants/auth';

import { AuthService } from './auth.service';

@Injectable()
export class JwtOktaAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.authService.getToken(request);
    const authType = this.authService.getAuthType(request);
    let jwt;
    switch (authType) {
      case AUTH_TYPE.JWT:
        jwt = await this.authService.validateJwtToken(token);
        break;
      case AUTH_TYPE.OKTA:
        jwt = await this.authService.validateOktaToken(token);
        break;
      default:
        throw new Error('Invalid Authorization Type Header');
    }
    request.user = jwt;
    return true;
  }
}
