import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import OktaJwtVerifier from '@okta/jwt-verifier';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class OktaAuthGuard implements CanActivate {
  //   private oktaVerifier: OktaJwtVerifier;
  //   private audience: string;

  constructor(
    readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    // this.oktaVerifier = new OktaJwtVerifier({
    //   issuer: config.get('OKTA_ISSUER'),
    //   clientId: config.get('OKTA_CLIENTID'),
    // });
    // this.audience = config.get('OKTA_AUDIENCE');
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);
    const jwt = await this.authService.validateOktaToken(token);
    request.user = jwt;
    return true;
  }

  getToken(request: { headers: Record<string, string | string[]> }): string {
    const authorization = request.headers['authorization'];
    if (!authorization || Array.isArray(authorization)) {
      throw new Error('Invalid Authorization Header');
    }
    const token = authorization.split(' ');
    return token[1];
  }
}
