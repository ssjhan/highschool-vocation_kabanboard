import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { KanbanBoard } from 'src/schema/kanban-board.schema';
import { CreateKanbanBoardDto } from './dto/create-kaban-board.dto';

/**
 * 칸반보드 Service
 */
@Injectable()
export class KanbanBoardService {
  /**
   * 생성자
   * @param kanbanBoardModel 칸반보드 Model
   */
  constructor(
    @InjectModel(KanbanBoard.name) private kanbanBoardModel: Model<KanbanBoard>,
  ) {}

  /**
   * 칸반보드 목록 조회 by status and createBy
   * @param status 상태
   * @param createBy 생성자 ObjectId
   * @returns 칸반보드 목록
   */
  async getKanbanBoardsByStatusAndCreateBy(status: string, createBy: string) {
    const kanbanBoards = await this.kanbanBoardModel.aggregate([
      {
        // 조건
        $match: {
          status,
          createBy: new mongoose.Types.ObjectId(createBy),
          isActivate: true,
        },
      },
      {
        // JOIN
        $lookup: {
          // JOIN 대상 지정
          from: 'users',
          // 외래키 지정
          let: {
            createBy: '$createBy',
          },
          pipeline: [
            {
              // JOIN 조건
              $match: {
                $expr: {
                  $eq: ['$$createBy', '$_id'],
                },
              },
            },
            {
              // 암호 필드 제외
              $project: { password: 0 },
            },
          ],
          // 별칭 지정
          as: 'createBy',
        },
      },
      {
        // 다건에서 단건으로 변경(조회 시, 첫번째로 나오는 값 대상으로 단건으로 변경)
        $unwind: '$createBy',
      },
      {
        // JOIN
        $lookup: {
          // JOIN 대상 지정
          from: 'users',
          // 외래키 지정
          let: {
            updateBy: '$updateBy',
          },
          pipeline: [
            {
              // JOIN 조건
              $match: {
                $expr: {
                  $eq: ['$$updateBy', '$_id'],
                },
              },
            },
            {
              // 암호 필드 제외
              $project: { password: 0 },
            },
          ],
          // 별칭 지정
          as: 'updateBy',
        },
      },
      {
        // 다건에서 단건으로 변경(조회 시, 첫번째로 나오는 값 대상으로 단건으로 변경)
        $unwind: '$updateBy',
      },
    ]);

    return kanbanBoards;
  }

  /**
   * 칸반보드 조회 by _id and createBy
   * @param _id 칸반보드 ObjectId
   * @param createBy 생성자 ObjectId
   * @returns 칸반보드
   */
  async getKanbanBoardByIdAndCreateBy(_id: string, createBy: string) {
    const [kanbanBoard] = await this.kanbanBoardModel.aggregate([
      {
        // 조건
        $match: {
          _id: new mongoose.Types.ObjectId(_id),
          createBy: new mongoose.Types.ObjectId(createBy),
          isActivate: true,
        },
      },
      {
        // JOIN
        $lookup: {
          // JOIN 대상 지정
          from: 'users',
          // 외래키 지정
          let: {
            createBy: '$createBy',
          },
          pipeline: [
            {
              // JOIN 조건
              $match: {
                $expr: {
                  $eq: ['$$createBy', '$_id'],
                },
              },
            },
            {
              // 암호 필드 제외
              $project: { password: 0 },
            },
          ],
          // 별칭 지정
          as: 'createBy',
        },
      },
      {
        // 다건에서 단건으로 변경(조회 시, 첫번째로 나오는 값 대상으로 단건으로 변경)
        $unwind: '$createBy',
      },
      {
        // JOIN
        $lookup: {
          // JOIN 대상 지정
          from: 'users',
          // 외래키 지정
          let: {
            updateBy: '$updateBy',
          },
          pipeline: [
            {
              // JOIN 조건
              $match: {
                $expr: {
                  $eq: ['$$updateBy', '$_id'],
                },
              },
            },
            {
              // 암호 필드 제외
              $project: { password: 0 },
            },
          ],
          // 별칭 지정
          as: 'updateBy',
        },
      },
      {
        // 다건에서 단건으로 변경(조회 시, 첫번째로 나오는 값 대상으로 단건으로 변경)
        $unwind: '$updateBy',
      },
    ]);

    return kanbanBoard;
  }

  /**
   * 칸반보드 생성
   * @param createKanbanBoardDto 칸반보드 생성 DTO
   * @param userId 생성자/수정자 ObjectId
   * @returns 생성된 칸반보드
   */
  async createKanbanBoard(
    createKanbanBoardDto: CreateKanbanBoardDto,
    userId: string,
  ) {
    const kanbanBoard = await this.kanbanBoardModel.create({
      ...createKanbanBoardDto,
      createBy: userId,
      updateBy: userId,
    });
    if (!kanbanBoard) return null;

    return this.getKanbanBoardByIdAndCreateBy(
      kanbanBoard._id.toString(),
      userId,
    );
  }

  /**
   * 칸반보드 제목 수정
   * @param title 제목
   * @param _id 칸반보드 ObjectId
   * @param createBy 생성자 ObjectId
   * @returns 수정된 칸반보드
   */
  async updateTitle(title: string, _id: string, createBy: string) {
    const kanbanBoard = await this.kanbanBoardModel.findOne({
      _id: new mongoose.Types.ObjectId(_id),
      createBy: new mongoose.Types.ObjectId(createBy),
    });
    if (!kanbanBoard) return null;
    kanbanBoard.title = title;
    kanbanBoard.updateAt = new Date();
    kanbanBoard.updateBy = new mongoose.Types.ObjectId(createBy);
    await kanbanBoard.save();

    return await this.getKanbanBoardByIdAndCreateBy(_id, createBy);
  }

  /**
   * 칸반보드 내용 수정
   * @param content 내용
   * @param _id 칸반보드 ObjectId
   * @param createBy 생성자 ObjectId
   * @returns 수정된 칸반보드
   */
  async updateContent(content: string, _id: string, createBy: string) {
    const kanbanBoard = await this.kanbanBoardModel.findOne({
      _id: new mongoose.Types.ObjectId(_id),
      createBy: new mongoose.Types.ObjectId(createBy),
    });
    if (!kanbanBoard) return null;
    kanbanBoard.content = content;
    kanbanBoard.updateAt = new Date();
    kanbanBoard.updateBy = new mongoose.Types.ObjectId(createBy);
    await kanbanBoard.save();

    return await this.getKanbanBoardByIdAndCreateBy(_id, createBy);
  }

  /**
   * 칸반보드 상태 수정
   * @param status 상태
   * @param _id 칸반보드 ObjectId
   * @param createBy 생성자 ObjectId
   * @returns 수정된 칸반보드
   */
  async updateStatus(status: string, _id: string, createBy: string) {
    const kanbanBoard = await this.kanbanBoardModel.findOne({
      _id: new mongoose.Types.ObjectId(_id),
      createBy: new mongoose.Types.ObjectId(createBy),
    });
    if (!kanbanBoard) return null;
    kanbanBoard.status = status;
    kanbanBoard.updateAt = new Date();
    kanbanBoard.updateBy = new mongoose.Types.ObjectId(createBy);
    await kanbanBoard.save();

    return await this.getKanbanBoardByIdAndCreateBy(_id, createBy);
  }

  /**
   * 칸반보드 삭제
   * @param _id 칸반보드 ObjectId
   * @param createBy 생성자 ObjectId
   * @returns 삭제된 칸반보드
   */
  async deleteKanbanBoard(_id: string, createBy: string) {
    const kanbanBoard = await this.kanbanBoardModel.findOne({
      _id: new mongoose.Types.ObjectId(_id),
      createBy: new mongoose.Types.ObjectId(createBy),
    });
    if (!kanbanBoard) return null;
    kanbanBoard.isActivate = false;
    kanbanBoard.updateAt = new Date();
    kanbanBoard.updateBy = new mongoose.Types.ObjectId(createBy);
    await kanbanBoard.save();

    return kanbanBoard;
  }
}
