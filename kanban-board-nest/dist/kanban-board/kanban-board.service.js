"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KanbanBoardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const kanban_board_schema_1 = require("../schema/kanban-board.schema");
let KanbanBoardService = class KanbanBoardService {
    constructor(kanbanBoardModel) {
        this.kanbanBoardModel = kanbanBoardModel;
    }
    async getKanbanBoardsByStatusAndCreateBy(status, createBy) {
        const kanbanBoards = await this.kanbanBoardModel.aggregate([
            {
                $match: {
                    status,
                    createBy: new mongoose_2.default.Types.ObjectId(createBy),
                    isActivate: true,
                },
            },
            {
                $lookup: {
                    from: 'users',
                    let: {
                        createBy: '$createBy',
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$$createBy', '$_id'],
                                },
                            },
                        },
                        {
                            $project: { password: 0 },
                        },
                    ],
                    as: 'createBy',
                },
            },
            {
                $unwind: '$createBy',
            },
            {
                $lookup: {
                    from: 'users',
                    let: {
                        updateBy: '$updateBy',
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$$updateBy', '$_id'],
                                },
                            },
                        },
                        {
                            $project: { password: 0 },
                        },
                    ],
                    as: 'updateBy',
                },
            },
            {
                $unwind: '$updateBy',
            },
        ]);
        return kanbanBoards;
    }
    async getKanbanBoardByIdAndCreateBy(_id, createBy) {
        const [kanbanBoard] = await this.kanbanBoardModel.aggregate([
            {
                $match: {
                    _id: new mongoose_2.default.Types.ObjectId(_id),
                    createBy: new mongoose_2.default.Types.ObjectId(createBy),
                    isActivate: true,
                },
            },
            {
                $lookup: {
                    from: 'users',
                    let: {
                        createBy: '$createBy',
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$$createBy', '$_id'],
                                },
                            },
                        },
                        {
                            $project: { password: 0 },
                        },
                    ],
                    as: 'createBy',
                },
            },
            {
                $unwind: '$createBy',
            },
            {
                $lookup: {
                    from: 'users',
                    let: {
                        updateBy: '$updateBy',
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$$updateBy', '$_id'],
                                },
                            },
                        },
                        {
                            $project: { password: 0 },
                        },
                    ],
                    as: 'updateBy',
                },
            },
            {
                $unwind: '$updateBy',
            },
        ]);
        return kanbanBoard;
    }
    async createKanbanBoard(createKanbanBoardDto, userId) {
        const kanbanBoard = await this.kanbanBoardModel.create(Object.assign(Object.assign({}, createKanbanBoardDto), { createBy: userId, updateBy: userId }));
        if (!kanbanBoard)
            return null;
        return this.getKanbanBoardByIdAndCreateBy(kanbanBoard._id.toString(), userId);
    }
    async updateTitle(title, _id, createBy) {
        const kanbanBoard = await this.kanbanBoardModel.findOne({
            _id: new mongoose_2.default.Types.ObjectId(_id),
            createBy: new mongoose_2.default.Types.ObjectId(createBy),
        });
        if (!kanbanBoard)
            return null;
        kanbanBoard.title = title;
        kanbanBoard.updateAt = new Date();
        kanbanBoard.updateBy = new mongoose_2.default.Types.ObjectId(createBy);
        await kanbanBoard.save();
        return await this.getKanbanBoardByIdAndCreateBy(_id, createBy);
    }
    async updateContent(content, _id, createBy) {
        const kanbanBoard = await this.kanbanBoardModel.findOne({
            _id: new mongoose_2.default.Types.ObjectId(_id),
            createBy: new mongoose_2.default.Types.ObjectId(createBy),
        });
        if (!kanbanBoard)
            return null;
        kanbanBoard.content = content;
        kanbanBoard.updateAt = new Date();
        kanbanBoard.updateBy = new mongoose_2.default.Types.ObjectId(createBy);
        await kanbanBoard.save();
        return await this.getKanbanBoardByIdAndCreateBy(_id, createBy);
    }
    async updateStatus(status, _id, createBy) {
        const kanbanBoard = await this.kanbanBoardModel.findOne({
            _id: new mongoose_2.default.Types.ObjectId(_id),
            createBy: new mongoose_2.default.Types.ObjectId(createBy),
        });
        if (!kanbanBoard)
            return null;
        kanbanBoard.status = status;
        kanbanBoard.updateAt = new Date();
        kanbanBoard.updateBy = new mongoose_2.default.Types.ObjectId(createBy);
        await kanbanBoard.save();
        return await this.getKanbanBoardByIdAndCreateBy(_id, createBy);
    }
    async deleteKanbanBoard(_id, createBy) {
        const kanbanBoard = await this.kanbanBoardModel.findOne({
            _id: new mongoose_2.default.Types.ObjectId(_id),
            createBy: new mongoose_2.default.Types.ObjectId(createBy),
        });
        if (!kanbanBoard)
            return null;
        kanbanBoard.isActivate = false;
        kanbanBoard.updateAt = new Date();
        kanbanBoard.updateBy = new mongoose_2.default.Types.ObjectId(createBy);
        await kanbanBoard.save();
        return kanbanBoard;
    }
};
KanbanBoardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(kanban_board_schema_1.KanbanBoard.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], KanbanBoardService);
exports.KanbanBoardService = KanbanBoardService;
//# sourceMappingURL=kanban-board.service.js.map