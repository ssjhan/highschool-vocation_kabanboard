import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { User } from 'src/decorator/user.decorator';

/**
 * 인증 Controller
 */
@Controller('api/auth')
export class AuthController {
  /**
   * 생성자
   * @param authService 인증 Service
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * 로그인
   * @param user 사용자 객체
   * @returns access_token
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user) {
    return this.authService.login(user);
  }
}
