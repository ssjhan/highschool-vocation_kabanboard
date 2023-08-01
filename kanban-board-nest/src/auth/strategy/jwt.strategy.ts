import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';

/**
 * JWT Strategy
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * 생성자
   */
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * 인증
   * @param payload payload
   * @returns payload
   */
  async validate(payload: any) {
    return payload;
  }
}
