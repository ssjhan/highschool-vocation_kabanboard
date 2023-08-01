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
exports.KanbanBoardController = void 0;
const common_1 = require("@nestjs/common");
const kanban_board_service_1 = require("./kanban-board.service");
const create_kaban_board_dto_1 = require("./dto/create-kaban-board.dto");
const user_decorator_1 = require("../decorator/user.decorator");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
let KanbanBoardController = class KanbanBoardController {
    constructor(kanbanBoardService) {
        this.kanbanBoardService = kanbanBoardService;
    }
    async createKanbanBoard(user, createKanbanBoardDto) {
        const kanbanBoard = await this.kanbanBoardService.createKanbanBoard(createKanbanBoardDto, user._id);
        return {
            success: true,
            kanbanBoard,
        };
    }
    async getKanbanBoardsByStatus(user, status) {
        const kanbanBoards = await this.kanbanBoardService.getKanbanBoardsByStatusAndCreateBy(status, user._id);
        return {
            success: true,
            kanbanBoards,
        };
    }
    async getKanbanBoardById(user, _id) {
        const kanbanBoard = await this.kanbanBoardService.getKanbanBoardByIdAndCreateBy(_id, user._id);
        return {
            success: true,
            kanbanBoard,
        };
    }
    async updateTitle(user, _id, title) {
        const kanbanBoard = await this.kanbanBoardService.updateTitle(title, _id, user._id);
        if (!kanbanBoard)
            throw new common_1.BadRequestException();
        return {
            success: true,
            kanbanBoard,
        };
    }
    async updateContent(user, _id, content) {
        const kanbanBoard = await this.kanbanBoardService.updateContent(content, _id, user._id);
        if (!kanbanBoard)
            throw new common_1.BadRequestException();
        return {
            success: true,
            kanbanBoard,
        };
    }
    async updateStatus(user, _id, status) {
        const kanbanBoard = await this.kanbanBoardService.updateStatus(status, _id, user._id);
        if (!kanbanBoard)
            throw new common_1.BadRequestException();
        return {
            success: true,
            kanbanBoard,
        };
    }
    async deleteKanbanBoard(user, _id) {
        const kanbanBoard = await this.kanbanBoardService.deleteKanbanBoard(_id, user._id);
        if (!kanbanBoard)
            throw new common_1.BadRequestException();
        return {
            success: true,
            kanbanBoard,
        };
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_kaban_board_dto_1.CreateKanbanBoardDto]),
    __metadata("design:returntype", Promise)
], KanbanBoardController.prototype, "createKanbanBoard", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('status/:status'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], KanbanBoardController.prototype, "getKanbanBoardsByStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':_id'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], KanbanBoardController.prototype, "getKanbanBoardById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':_id/title'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('_id')),
    __param(2, (0, common_1.Body)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], KanbanBoardController.prototype, "updateTitle", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':_id/content'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('_id')),
    __param(2, (0, common_1.Body)('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], KanbanBoardController.prototype, "updateContent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':_id/status'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('_id')),
    __param(2, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], KanbanBoardController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':_id'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], KanbanBoardController.prototype, "deleteKanbanBoard", null);
KanbanBoardController = __decorate([
    (0, common_1.Controller)('api/kanban-board'),
    __metadata("design:paramtypes", [kanban_board_service_1.KanbanBoardService])
], KanbanBoardController);
exports.KanbanBoardController = KanbanBoardController;
//# sourceMappingURL=kanban-board.controller.js.map