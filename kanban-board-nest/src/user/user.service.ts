import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

/**
 * 사용자 Service
 */
@Injectable()
export class UserService {
  /**
   * 생성자
   * @param userModel 사용자 Model
   */
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserByUsername(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username }).lean();
  }

  /**
   * 사용자 생성
   * @param createUserDto 사용자 생성 DTO
   * @returns 사용자
   */
  async createUser(createUserDto: CreateUserDto) {
    return await this.userModel.create({
      ...createUserDto,
    });
  }

  /**
   * 사용자 갯수 조회 by username
   * @param username 아이디
   * @returns 사용자 갯수
   */
  async countUserByUsername(username: string) {
    return await this.userModel.find({ username }).countDocuments();
  }

  /**
   * 아이디 중복 여부 확인
   * @param username 아이디
   * @returns 아이디 중복 여부
   */
  async isDucplicateByUsername(username: string) {
    return (await this.countUserByUsername(username)) > 0;
  }
}
