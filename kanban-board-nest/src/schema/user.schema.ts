import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

/**
 * 사용자 Document
 */
export type UserDocument = HydratedDocument<User>;

/**
 * 사용자
 */
@Schema()
export class User {
  /**
   * 아이디
   */
  @Prop({ type: String, required: true })
  username: string;

  /**
   * 암호
   */
  @Prop({ type: String, required: true })
  password: string;

  /**
   * 닉네임
   */
  @Prop({ type: String, required: true })
  nickname: string;

  /**
   * 생성일시
   */
  @Prop({ type: Date, required: true, default: new Date() })
  createAt: Date;

  /**
   * 수정일시
   */
  @Prop({ type: Date, required: true, default: new Date() })
  updateAt: Date;
}

/**
 * 사용자 Schema
 */
export const UserSchema = SchemaFactory.createForClass(User);
