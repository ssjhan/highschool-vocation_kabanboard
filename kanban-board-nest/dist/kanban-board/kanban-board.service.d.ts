import mongoose, { Model } from 'mongoose';
import { KanbanBoard } from 'src/schema/kanban-board.schema';
import { CreateKanbanBoardDto } from './dto/create-kaban-board.dto';
export declare class KanbanBoardService {
    private kanbanBoardModel;
    constructor(kanbanBoardModel: Model<KanbanBoard>);
    getKanbanBoardsByStatusAndCreateBy(status: string, createBy: string): Promise<any[]>;
    getKanbanBoardByIdAndCreateBy(_id: string, createBy: string): Promise<any>;
    createKanbanBoard(createKanbanBoardDto: CreateKanbanBoardDto, userId: string): Promise<any>;
    updateTitle(title: string, _id: string, createBy: string): Promise<any>;
    updateContent(content: string, _id: string, createBy: string): Promise<any>;
    updateStatus(status: string, _id: string, createBy: string): Promise<any>;
    deleteKanbanBoard(_id: string, createBy: string): Promise<mongoose.Document<unknown, {}, KanbanBoard> & KanbanBoard & {
        _id: mongoose.Types.ObjectId;
    }>;
}
