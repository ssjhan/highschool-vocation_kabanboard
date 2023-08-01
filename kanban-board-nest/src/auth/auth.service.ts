import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

/**
 * 인증 Service
 */
@Injectable()
export class AuthService {
  /**
   * 생성자
   * @param userService 사용자 Service
   * @param jwtService JWT Service
   */
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 사용자 인증
   * @param username 아이디
   * @param pass 암호
   * @returns 사용자
   */
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * 로그인
   * @param user 사용자
   * @returns accecc_token
   */
  async login(user: any) {
    const payload = { ...user, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
