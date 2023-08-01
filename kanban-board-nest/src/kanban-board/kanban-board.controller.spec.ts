import { Test, TestingModule } from '@nestjs/testing';
import { KanbanBoardController } from './kanban-board.controller';

describe('KanbanBoardController', () => {
  let controller: KanbanBoardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KanbanBoardController],
    }).compile();

    controller = module.get<KanbanBoardController>(KanbanBoardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
