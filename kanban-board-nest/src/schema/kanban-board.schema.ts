import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

/**
 * 칸반보드 Document
 */
export type KanbanBoardDocument = HydratedDocument<KanbanBoard>;

/**
 * 칸반보드
 */
@Schema()
export class KanbanBoard {
  /**
   * 제목
   */
  @Prop({ type: String, default: '' })
  title: string;

  /**
   * 내용
   */
  @Prop({ type: String, default: '' })
  content: string;

  /**
   * 상태
   */
  @Prop({
    type: String,
    enum: ['TODO', 'IN_PROGRESS', 'DONE'],
    required: true,
    default: 'TODO',
  })
  status: string;

  /**
   * 활성화 여부
   */
  @Prop({
    type: Boolean,
    required: true,
    default: true,
  })
  isActivate: boolean;

  /**
   * 생성자
   */
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User.name,
  })
  createBy: Types.ObjectId;

  /**
   * 생성일시
   */
  @Prop({
    type: Date,
    required: true,
    default: new Date(),
  })
  createAt: Date;

  /**
   * 수정자
   */
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User.name,
  })
  updateBy: Types.ObjectId;

  /**
   * 수정일시
   */
  @Prop({
    type: Date,
    required: true,
    default: new Date(),
  })
  updateAt: Date;
}

/**
 * 칸반보드 Schema
 */
export const KanbanBoardSchema = SchemaFactory.createForClass(KanbanBoard);
