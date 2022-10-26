import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class OktaAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.authService.getToken(request);
    const jwt = await this.authService.validateOktaToken(token);
    request.user = jwt;
    return true;
  }
}
