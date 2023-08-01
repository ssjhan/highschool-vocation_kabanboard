import { Test, TestingModule } from '@nestjs/testing';
import { KanbanBoardService } from './kanban-board.service';

describe('KanbanBoardService', () => {
  let service: KanbanBoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KanbanBoardService],
    }).compile();

    service = module.get<KanbanBoardService>(KanbanBoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
