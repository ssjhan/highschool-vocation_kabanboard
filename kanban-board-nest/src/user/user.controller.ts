import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

/**
 * 사용자 Controller
 */
@Controller('api/user')
export class UserController {
  /**
   * 생성자
   * @param userService 사용자 Service
   */
  constructor(private readonly userService: UserService) {}

  /**
   * 사용자 생성
   * @param createUserDto 사용자 생성 DTO
   * @returns
   */
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    // 아이디 중복 확인
    const isDucplicateByUsername =
      await this.userService.isDucplicateByUsername(createUserDto.username);
    if (isDucplicateByUsername) throw new BadRequestException();

    // 사용자 생성
    const user = await this.userService.createUser(createUserDto);
    if (!user) throw new InternalServerErrorException();

    return {
      success: true,
    };
  }
}
