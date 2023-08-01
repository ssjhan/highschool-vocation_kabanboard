import { Module } from '@nestjs/common';
import { KanbanBoardController } from './kanban-board.controller';
import { KanbanBoardService } from './kanban-board.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KanbanBoard, KanbanBoardSchema } from 'src/schema/kanban-board.schema';

/**
 * 칸반보드 Module
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: KanbanBoard.name, schema: KanbanBoardSchema },
    ]),
  ],
  controllers: [KanbanBoardController],
  providers: [KanbanBoardService],
})
export class KanbanBoardModule {}
