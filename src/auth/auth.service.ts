import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as OktaJwtVerifier from '@okta/jwt-verifier';
import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
import { USERS } from 'src/constants/users';

@Injectable()
export class AuthService {
  private oktaVerifier: OktaJwtVerifier;
  private audience: string;

  constructor(readonly config: ConfigService, private jwtService: JwtService) {
    this.oktaVerifier = new OktaJwtVerifier({
      issuer: config.get('OKTA_ISSUER'),
      clientId: config.get('OKTA_CLIENTID'),
    });
    this.audience = config.get('OKTA_AUDIENCE');
  }

  async validateOktaToken(token: string): Promise<any> {
    const jwt = await this.oktaVerifier.verifyAccessToken(token, this.audience);
    return jwt;
  }

  async validateJwtToken(token: string): Promise<any> {
    const jwt = this.jwtService.verify(token);
    return jwt;
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = USERS.find((e) => e.username === username);
    if (!user) return null;
    // const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user) {
      return user;
    }
    return null;
  }
  async login(user: any) {
    const validUser = await this.validateUser(user?.username, user?.password);
    const payload = { username: validUser.username, sub: validUser?._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  getToken(request: { headers: Record<string, string | string[]> }): string {
    const authorization = request.headers['authorization'];
    if (!authorization || Array.isArray(authorization)) {
      throw new Error('Invalid Authorization Header');
    }
    const token = authorization.split(' ');
    return token[1];
  }

  getAuthType(request: { headers: Record<string, string | string[]> }): string {
    const authType = request.headers['auth-type'];
    if (!authType) {
      throw new Error('Invalid Authorization Type Header');
    }
    return authType.toString();
  }
}
