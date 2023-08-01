import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

/**
 * Local Strategy
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * 생성자
   * @param authService 인증 Service
   */
  constructor(private readonly authService: AuthService) {
    super();
  }

  /**
   * 사용자 인증
   * @param username 아이디
   * @param password 암호
   * @returns 사용자
   */
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
