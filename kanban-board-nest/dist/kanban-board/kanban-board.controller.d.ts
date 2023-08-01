/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { KanbanBoardService } from './kanban-board.service';
import { CreateKanbanBoardDto } from './dto/create-kaban-board.dto';
export declare class KanbanBoardController {
    private readonly kanbanBoardService;
    constructor(kanbanBoardService: KanbanBoardService);
    createKanbanBoard(user: any, createKanbanBoardDto: CreateKanbanBoardDto): Promise<{
        success: boolean;
        kanbanBoard: any;
    }>;
    getKanbanBoardsByStatus(user: any, status: string): Promise<{
        success: boolean;
        kanbanBoards: any[];
    }>;
    getKanbanBoardById(user: any, _id: string): Promise<{
        success: boolean;
        kanbanBoard: any;
    }>;
    updateTitle(user: any, _id: string, title: string): Promise<{
        success: boolean;
        kanbanBoard: any;
    }>;
    updateContent(user: any, _id: string, content: string): Promise<{
        success: boolean;
        kanbanBoard: any;
    }>;
    updateStatus(user: any, _id: string, status: string): Promise<{
        success: boolean;
        kanbanBoard: any;
    }>;
    deleteKanbanBoard(user: any, _id: string): Promise<{
        success: boolean;
        kanbanBoard: import("mongoose").Document<unknown, {}, import("../schema/kanban-board.schema").KanbanBoard> & import("../schema/kanban-board.schema").KanbanBoard & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
}
