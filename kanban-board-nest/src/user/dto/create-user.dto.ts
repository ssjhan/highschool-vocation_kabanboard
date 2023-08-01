import { IsNotEmpty } from 'class-validator';

/**
 * 사용자 생성 DTO
 */
export class CreateUserDto {
  /**
   * 아이디
   */
  @IsNotEmpty({ message: '아이디를 입력해주세요' })
  username: string;

  /**
   * 암호
   */
  @IsNotEmpty({ message: '암호를 입력해주세요' })
  password: string;

  /**
   * 닉네임
   */
  @IsNotEmpty({ message: '닉네임을 입력해주세요' })
  nickname: string;
}
