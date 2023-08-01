import mongoose, { HydratedDocument, Types } from 'mongoose';
export type KanbanBoardDocument = HydratedDocument<KanbanBoard>;
export declare class KanbanBoard {
    title: string;
    content: string;
    status: string;
    isActivate: boolean;
    createBy: Types.ObjectId;
    createAt: Date;
    updateBy: Types.ObjectId;
    updateAt: Date;
}
export declare const KanbanBoardSchema: mongoose.Schema<KanbanBoard, mongoose.Model<KanbanBoard, any, any, any, mongoose.Document<unknown, any, KanbanBoard> & KanbanBoard & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, KanbanBoard, mongoose.Document<unknown, {}, KanbanBoard> & KanbanBoard & {
    _id: Types.ObjectId;
}>;
