import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { KanbanBoardService } from './kanban-board.service';
import { CreateKanbanBoardDto } from './dto/create-kaban-board.dto';
import { User } from 'src/decorator/user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

/**
 * 칸반보드 Controller
 */
@Controller('api/kanban-board')
export class KanbanBoardController {
  /**
   * 생성자
   * @param kanbanBoardService 칸반보드 Service
   */
  constructor(private readonly kanbanBoardService: KanbanBoardService) {}

  /**
   * 칸반보드 생성
   * @param user 사용자 객체
   * @param createKanbanBoardDto 칸반보드 생성 DTO
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async createKanbanBoard(
    @User() user,
    @Body() createKanbanBoardDto: CreateKanbanBoardDto,
  ) {
    const kanbanBoard = await this.kanbanBoardService.createKanbanBoard(
      createKanbanBoardDto,
      user._id,
    );

    return {
      success: true,
      kanbanBoard,
    };
  }

  /**
   * 칸반보드 목록 조회  by status
   * @param user 사용자 객체
   * @param status 상태
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Get('status/:status')
  async getKanbanBoardsByStatus(@User() user, @Param('status') status: string) {
    const kanbanBoards =
      await this.kanbanBoardService.getKanbanBoardsByStatusAndCreateBy(
        status,
        user._id,
      );

    return {
      success: true,
      kanbanBoards,
    };
  }

  /**
   * 칸반보드 조회 by _id
   * @param user 사용자 객체
   * @param _id 칸반보드 ObjectId
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Get(':_id')
  async getKanbanBoardById(@User() user, @Param('_id') _id: string) {
    const kanbanBoard =
      await this.kanbanBoardService.getKanbanBoardByIdAndCreateBy(
        _id,
        user._id,
      );

    return {
      success: true,
      kanbanBoard,
    };
  }

  /**
   * 제목 수정 by _id
   * @param user 사용자 객체
   * @param _id 칸반보드 ObjectId
   * @param title 제목
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':_id/title')
  async updateTitle(
    @User() user,
    @Param('_id') _id: string,
    @Body('title') title: string,
  ) {
    // 제목 수정 처리
    const kanbanBoard = await this.kanbanBoardService.updateTitle(
      title,
      _id,
      user._id,
    );

    // 수정 대상이 없는 경우
    if (!kanbanBoard) throw new BadRequestException();

    return {
      success: true,
      kanbanBoard,
    };
  }

  /**
   * 내용 수정 by _id
   * @param user 사용자 객체
   * @param _id 칸반보드 ObjectId
   * @param content 내용
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':_id/content')
  async updateContent(
    @User() user,
    @Param('_id') _id: string,
    @Body('content') content: string,
  ) {
    // 내용 수정 처리
    const kanbanBoard = await this.kanbanBoardService.updateContent(
      content,
      _id,
      user._id,
    );

    // 수정 대상이 없는 경우
    if (!kanbanBoard) throw new BadRequestException();

    return {
      success: true,
      kanbanBoard,
    };
  }

  /**
   * 상태 수정 by _id
   * @param user 사용자 객체
   * @param _id 칸반보드 ObjectId
   * @param status 상태
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':_id/status')
  async updateStatus(
    @User() user,
    @Param('_id') _id: string,
    @Body('status') status: string,
  ) {
    // 상태 수정 처리
    const kanbanBoard = await this.kanbanBoardService.updateStatus(
      status,
      _id,
      user._id,
    );

    // 수정 대상이 없는 경우
    if (!kanbanBoard) throw new BadRequestException();

    return {
      success: true,
      kanbanBoard,
    };
  }

  /**
   * 칸반보드 삭제 ObjectId
   * @param user 사용자 객체
   * @param _id 칸반보드 ObjectId
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':_id')
  async deleteKanbanBoard(@User() user, @Param('_id') _id: string) {
    // 삭제 처리
    const kanbanBoard = await this.kanbanBoardService.deleteKanbanBoard(
      _id,
      user._id,
    );

    // 삭제 대상이 없는 경우
    if (!kanbanBoard) throw new BadRequestException();

    return {
      success: true,
      kanbanBoard,
    };
  }
}
